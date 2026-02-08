'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { services, addOns } from '@/data/services';
import { Button } from '@/components/ui/button';

type Booking = {
  id: string;
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
  total_price: number;
};

const formatDollars = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export default function BookingConfirmationPage() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('divinedetail_bookings');
    if (!stored) {
      setErrorMessage('No booking found.');
      setLoading(false);
      return;
    }
    try {
      const parsed = JSON.parse(stored) as Booking[];
      if (!Array.isArray(parsed) || parsed.length === 0) {
        setErrorMessage('No booking found.');
      } else {
        setBooking(parsed[parsed.length - 1]);
      }
    } catch (error) {
      setErrorMessage('Unable to load booking.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addOnSummary = useMemo(() => {
    if (!booking) return [];
    return (booking.add_ons ?? [])
      .map((selection) => {
        const addOn = addOns.find((item) => item.id === selection.id);
        if (!addOn) return null;
        const qty = selection.quantity && selection.quantity > 1 ? ` x${selection.quantity}` : '';
        return `${addOn.name}${qty}`;
      })
      .filter(Boolean);
  }, [booking]);

  const handleCalendarDownload = () => {
    if (!booking) return;
    const date = new Date(`${booking.preferred_date} ${booking.preferred_time}`);
    const endDate = new Date(date.getTime() + 60 * 60 * 1000);
    const formatDate = (value: Date) => value.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Divine Detail//Booking//EN',
      'BEGIN:VEVENT',
      `UID:${booking.id}`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(date)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:Divine Detail Booking`,
      `LOCATION:${booking.service_address}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'divine-detail-booking.ics';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-divine-black text-divine-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          Confirming your booking...
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen pt-20 bg-divine-black text-divine-white flex items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold mb-2">Unable to confirm booking</h1>
          <p className="text-gray-400 mb-6">{errorMessage}</p>
          <Link href="/book" className="text-divine-gold hover:text-divine-gold/90">
            Return to booking
          </Link>
        </div>
      </div>
    );
  }

  if (!booking) return null;

  const service = services.find((item) => item.id === booking.service_id);

  return (
    <div className="min-h-screen pt-20 bg-divine-black text-divine-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-10">
          <CheckCircle2 className="h-16 w-16 text-green-400 mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl font-heading font-bold mb-3">Booking Confirmed!</h1>
          <p className="text-gray-400">
            We’ll see you on {format(new Date(booking.preferred_date), 'PPP')} at{' '}
            {booking.preferred_time}.
          </p>
        </div>

        <div className="card-base p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
            <div>
              <p>
                <span className="text-gray-400">Service:</span> {service?.name ?? booking.service_id}
              </p>
              <p>
                <span className="text-gray-400">Vehicle:</span> {booking.vehicle_type} —{' '}
                {booking.vehicle_details}
              </p>
              <p>
                <span className="text-gray-400">Add-ons:</span>{' '}
                {addOnSummary.length ? addOnSummary.join(', ') : 'None'}
              </p>
            </div>
            <div>
              <p>
                <span className="text-gray-400">Date:</span>{' '}
                {format(new Date(booking.preferred_date), 'PPP')}
              </p>
              <p>
                <span className="text-gray-400">Time:</span> {booking.preferred_time}
              </p>
              <p>
                <span className="text-gray-400">Address:</span> {booking.service_address}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-divine-darker-gray pt-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Paid</p>
              <p className="text-3xl font-bold text-divine-gold">
                {formatDollars(booking.total_price)}
              </p>
            </div>
            <Button onClick={handleCalendarDownload} className="primary-button">
              Add to Calendar
            </Button>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/" className="text-divine-gold hover:text-divine-gold/90">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
