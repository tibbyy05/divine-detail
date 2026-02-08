import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';
import { addOns, services } from '@/data/services';
import { COMPANY_INFO } from '@/lib/constants';

export const runtime = 'nodejs';

const formatDollars = (cents: number) => `$${(cents / 100).toFixed(2)}`;

const buildAddOnSummary = (addOnSelections: { id: string; quantity?: number }[]) =>
  addOnSelections
    .map((selection) => {
      const addOn = addOns.find((item) => item.id === selection.id);
      if (!addOn) return null;
      const qty = selection.quantity && selection.quantity > 1 ? ` x${selection.quantity}` : '';
      return `${addOn.name}${qty}`;
    })
    .filter(Boolean)
    .join(', ');

const sendEmails = async (booking: {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  vehicle_type: string;
  vehicle_details: string;
  service_id: string;
  add_ons: { id: string; quantity?: number }[];
  service_address: string;
  preferred_date: string;
  preferred_time: string;
  special_instructions: string;
  total_price: number;
}) => {
  const service = services.find((item) => item.id === booking.service_id);
  const addOnSummary = buildAddOnSummary(booking.add_ons ?? []);
  const totalPaid = formatDollars(booking.total_price);
  const contactEmail = process.env.CONTACT_EMAIL ?? COMPANY_INFO.email;

  await resend.emails.send({
    from: 'Divine Detail <booking@divinedetail.com>',
    to: [booking.customer_email],
    subject: 'Your Divine Detail Booking is Confirmed!',
    html: `
      <h2>Booking Confirmed!</h2>
      <p>Hi ${booking.customer_name},</p>
      <p>Your detail is confirmed for <strong>${booking.preferred_date}</strong> at <strong>${booking.preferred_time}</strong>.</p>
      <p><strong>Service:</strong> ${service?.name ?? booking.service_id}</p>
      <p><strong>Vehicle:</strong> ${booking.vehicle_type} — ${booking.vehicle_details}</p>
      <p><strong>Add-ons:</strong> ${addOnSummary || 'None'}</p>
      <p><strong>Address:</strong> ${booking.service_address}</p>
      <p><strong>Total Paid:</strong> ${totalPaid}</p>
      <p>If you need to reschedule, please call us at ${COMPANY_INFO.phoneDisplay}.</p>
    `,
  });

  await resend.emails.send({
    from: 'Divine Detail <booking@divinedetail.com>',
    to: [contactEmail],
    subject: `New Booking: ${service?.name ?? booking.service_id} — ${booking.customer_name}`,
    html: `
      <h2>New Booking Received</h2>
      <p><strong>Customer:</strong> ${booking.customer_name}</p>
      <p><strong>Email:</strong> ${booking.customer_email}</p>
      <p><strong>Phone:</strong> ${booking.customer_phone}</p>
      <p><strong>Vehicle:</strong> ${booking.vehicle_type} — ${booking.vehicle_details}</p>
      <p><strong>Service:</strong> ${service?.name ?? booking.service_id}</p>
      <p><strong>Add-ons:</strong> ${addOnSummary || 'None'}</p>
      <p><strong>Address:</strong> ${booking.service_address}</p>
      <p><strong>Gate Code:</strong> ${booking.special_instructions || 'N/A'}</p>
      <p><strong>Date:</strong> ${booking.preferred_date}</p>
      <p><strong>Time:</strong> ${booking.preferred_time}</p>
      <p><strong>Total Paid:</strong> ${totalPaid}</p>
    `,
  });
};

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? '';

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Missing webhook signature.' }, { status: 400 });
  }

  const body = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const bookingId = session.metadata?.booking_id;
    if (bookingId) {
      const { data: booking } = await supabase
        .from('bookings')
        .update({
          payment_status: 'paid',
          booking_status: 'confirmed',
          stripe_payment_id: session.payment_intent?.toString() ?? session.id,
        })
        .eq('id', bookingId)
        .select('*')
        .single();

      if (booking) {
        await sendEmails(booking);
      }
    }
  }

  return NextResponse.json({ received: true });
}
