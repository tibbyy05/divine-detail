import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { addOns, services } from '@/data/services';

export const runtime = 'nodejs';

type AddOnSelection = {
  id: string;
  quantity?: number;
};

type CheckoutPayload = {
  serviceId: string;
  vehicleType: 'midsize' | 'fullsize';
  vehicleDetails: string;
  serviceAddress: string;
  gateCode?: string;
  preferredDate: string;
  preferredTime: string;
  specialInstructions?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  addOns: AddOnSelection[];
};

const parseAddOnPrice = (price: string) => {
  const numeric = Number(price.replace(/[^0-9]/g, ''));
  return Number.isNaN(numeric) ? 0 : numeric;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CheckoutPayload;
    const service = services.find((item) => item.id === payload.serviceId);
    if (!service) {
      return NextResponse.json({ error: 'Service not found.' }, { status: 400 });
    }

    if (service.isCallForQuote) {
      return NextResponse.json(
        { error: 'This service requires a custom quote. Please contact us.' },
        { status: 400 },
      );
    }

    const basePrice =
      payload.vehicleType === 'fullsize'
        ? Number(service.price.fullSize)
        : Number(service.price.midSize);

    const addOnTotal = payload.addOns.reduce((total, selection) => {
      const addOn = addOns.find((item) => item.id === selection.id);
      if (!addOn) return total;
      const quantity = selection.quantity && selection.quantity > 0 ? selection.quantity : 1;
      const unitPrice = parseAddOnPrice(addOn.price);
      return total + unitPrice * quantity;
    }, 0);

    const totalPrice = Math.round((basePrice + addOnTotal) * 100);

    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        customer_name: payload.customerName,
        customer_email: payload.customerEmail,
        customer_phone: payload.customerPhone,
        vehicle_type: payload.vehicleType,
        vehicle_details: payload.vehicleDetails,
        service_id: payload.serviceId,
        add_ons: payload.addOns,
        service_address: payload.serviceAddress,
        preferred_date: payload.preferredDate,
        preferred_time: payload.preferredTime,
        special_instructions: [
          payload.gateCode ? `Gate Code: ${payload.gateCode}` : null,
          payload.specialInstructions ? `Notes: ${payload.specialInstructions}` : null,
        ]
          .filter(Boolean)
          .join(' | '),
        total_price: totalPrice,
        payment_status: 'pending',
        booking_status: 'new',
      })
      .select('id')
      .single();

    if (bookingError || !booking) {
      return NextResponse.json({ error: 'Unable to create booking.' }, { status: 500 });
    }

    const addOnDescription = payload.addOns
      .map((selection) => {
        const addOn = addOns.find((item) => item.id === selection.id);
        if (!addOn) return null;
        const qty = selection.quantity && selection.quantity > 1 ? ` x${selection.quantity}` : '';
        return `${addOn.name}${qty}`;
      })
      .filter(Boolean)
      .join(', ');

    const description = [
      `Vehicle: ${payload.vehicleType === 'fullsize' ? 'Full-Size' : 'Mid-Size'}`,
      addOnDescription ? `Add-ons: ${addOnDescription}` : null,
    ]
      .filter(Boolean)
      .join(' | ');

    const origin = request.headers.get('origin') ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: payload.customerEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: totalPrice,
            product_data: {
              name: `${service.name} Detail`,
              description,
            },
          },
        },
      ],
      metadata: {
        booking_id: booking.id,
      },
      success_url: `${origin}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/book?cancelled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
