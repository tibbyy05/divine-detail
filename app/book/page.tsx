'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isBefore,
  isSameDay,
} from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Check, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { services, addOns } from '@/data/services';
import { formatPrice, normalizeValue } from '@/lib/utils';
import { blockedDates as mockBlockedDates, mockBookings } from '@/data/mockBookings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type VehicleType = 'midsize' | 'fullsize';

type AddOnSelection = {
  id: string;
  quantity?: number;
};

type BookingRecord = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicleType: VehicleType;
  vehicleDetails: string;
  serviceId: string;
  addOns: AddOnSelection[];
  serviceAddress: string;
  preferredDate: string;
  preferredTime: string;
  specialInstructions: string;
  totalPrice: number;
  bookingStatus: 'confirmed';
  createdAt: string;
};

const stepLabels = ['Service', 'Vehicle', 'Date/Time', 'Details', 'Payment'];

const parseAddOnPrice = (price: string) => {
  const numeric = Number(price.replace(/[^0-9]/g, ''));
  return Number.isNaN(numeric) ? 0 : numeric;
};

const timeSlots = Array.from({ length: 13 }, (_, index) => {
  const hour = 7 + index;
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${displayHour}:00 ${suffix}`;
});

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);

  const [serviceId, setServiceId] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnSelection[]>([]);
  const [addOnQuantities, setAddOnQuantities] = useState<Record<string, number>>({});

  const [vehicleType, setVehicleType] = useState<VehicleType>('midsize');
  const [vehicleDetails, setVehicleDetails] = useState('');
  const [serviceAddress, setServiceAddress] = useState('');
  const [gateCode, setGateCode] = useState('');

  const [preferredDate, setPreferredDate] = useState<Date | null>(null);
  const [preferredTime, setPreferredTime] = useState('');

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [blockedDates, setBlockedDates] = useState<string[]>(mockBlockedDates);
  const [bookedCounts, setBookedCounts] = useState<Record<string, number>>({});
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [localBookings, setLocalBookings] = useState<BookingRecord[]>([]);

  const [loadingCalendar, setLoadingCalendar] = useState(true);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const selectedService = services.find((service) => service.id === serviceId);

  useEffect(() => {
    const param = searchParams.get('service');
    if (!param) return;
    const match = services.find((service) => {
      const normalizedParam = normalizeValue(param);
      return (
        normalizeValue(service.id) === normalizedParam ||
        normalizeValue(service.name) === normalizedParam
      );
    });
    if (match) {
      setServiceId(match.id);
    }
  }, [searchParams]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('divinedetail_bookings');
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as BookingRecord[];
      if (Array.isArray(parsed)) {
        setLocalBookings(parsed);
      }
    } catch (error) {
      setLocalBookings([]);
    }
  }, []);

  useEffect(() => {
    const loadCalendarData = async () => {
      setLoadingCalendar(true);
      const monthStart = startOfMonth(calendarMonth);
      const monthEnd = endOfMonth(addMonths(calendarMonth, 1));

      const blockedList = mockBlockedDates;
      const counts: Record<string, number> = {};

      const combinedBookings = [
        ...mockBookings,
        ...localBookings.map((booking) => ({
          preferred_date: booking.preferredDate,
        })),
      ];

      combinedBookings.forEach((row) => {
        const date = row.preferred_date;
        if (isBefore(new Date(date), monthStart) || isBefore(monthEnd, new Date(date))) return;
        if (!counts[date]) counts[date] = 0;
        counts[date] += 1;
      });

      setBlockedDates(blockedList);
      setBookedCounts(counts);
      setLoadingCalendar(false);
    };

    loadCalendarData();
  }, [calendarMonth, localBookings]);

  useEffect(() => {
    const loadTimes = async () => {
      if (!preferredDate) return;
      setLoadingTimes(true);
      const dateString = format(preferredDate, 'yyyy-MM-dd');
      const combined = [
        ...mockBookings,
        ...localBookings.map((booking) => ({
          preferred_date: booking.preferredDate,
          preferred_time: booking.preferredTime,
        })),
      ];
      setBookedTimes(
        combined
          .filter((row) => row.preferred_date === dateString)
          .map((row) => row.preferred_time),
      );
      setLoadingTimes(false);
    };

    loadTimes();
  }, [preferredDate, localBookings]);

  const addOnOptions = useMemo(() => addOns, []);

  const totalPrice = useMemo(() => {
    if (!selectedService || selectedService.isCallForQuote) return null;
    const base =
      vehicleType === 'fullsize'
        ? Number(selectedService.price.fullSize)
        : Number(selectedService.price.midSize);
    const addOnTotal = selectedAddOns.reduce((sum, selection) => {
      const addOn = addOnOptions.find((item) => item.id === selection.id);
      if (!addOn) return sum;
      const quantity = selection.quantity && selection.quantity > 0 ? selection.quantity : 1;
      return sum + parseAddOnPrice(addOn.price) * quantity;
    }, 0);
    return Math.round((base + addOnTotal) * 100);
  }, [selectedService, vehicleType, selectedAddOns, addOnOptions]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => {
      if (prev.some((item) => item.id === id)) {
        return prev.filter((item) => item.id !== id);
      }
      const quantity = addOnQuantities[id] ?? 1;
      return [...prev, { id, quantity }];
    });
  };

  const updateAddOnQuantity = (id: string, quantity: number) => {
    setAddOnQuantities((prev) => ({ ...prev, [id]: quantity }));
    setSelectedAddOns((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const isDateDisabled = (date: Date) => {
    if (isBefore(date, new Date())) return true;
    const dateString = format(date, 'yyyy-MM-dd');
    if (blockedDates.includes(dateString)) return true;
    if ((bookedCounts[dateString] ?? 0) >= 2) return true;
    return false;
  };

  const goNext = () => setStep((prev) => Math.min(prev + 1, stepLabels.length - 1));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleCheckout = async () => {
    setSubmitting(true);
    setErrorMessage('');

    try {
      const booking: BookingRecord = {
        id: `${Date.now()}`,
        customerName,
        customerEmail,
        customerPhone,
        vehicleType,
        vehicleDetails,
        serviceId,
        addOns: selectedAddOns,
        serviceAddress,
        preferredDate: preferredDate ? format(preferredDate, 'yyyy-MM-dd') : '',
        preferredTime,
        specialInstructions: [gateCode ? `Gate Code: ${gateCode}` : null, specialInstructions]
          .filter(Boolean)
          .join(' | '),
        totalPrice: totalPrice ?? 0,
        bookingStatus: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      const updatedBookings = [...localBookings, booking];
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('divinedetail_bookings', JSON.stringify(updatedBookings));
      }
      setLocalBookings(updatedBookings);

      setTimeout(() => {
        router.push('/booking/confirmation');
      }, 2000);
    } catch (error) {
      setErrorMessage('Network error. Please try again.');
      setSubmitting(false);
    }
  };

  const summaryAddOns = selectedAddOns
    .map((selection) => {
      const addOn = addOnOptions.find((item) => item.id === selection.id);
      if (!addOn) return null;
      const qty = selection.quantity && selection.quantity > 1 ? ` x${selection.quantity}` : '';
      return `${addOn.name}${qty}`;
    })
    .filter(Boolean);

  const monthDays = eachDayOfInterval({
    start: startOfMonth(calendarMonth),
    end: endOfMonth(calendarMonth),
  });

  const nextMonthDays = eachDayOfInterval({
    start: startOfMonth(addMonths(calendarMonth, 1)),
    end: endOfMonth(addMonths(calendarMonth, 1)),
  });

  return (
    <div className="min-h-screen pt-20 bg-divine-black text-divine-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Book Your Detail</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Complete your booking in just a few steps. Select your service, choose a time, and pay
            securely.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {stepLabels.map((label, index) => {
            const status =
              index < step ? 'completed' : index === step ? 'current' : 'upcoming';
            return (
              <div key={label} className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center border ${
                    status === 'completed'
                      ? 'bg-divine-gold text-divine-black border-divine-gold'
                      : status === 'current'
                      ? 'border-divine-gold text-divine-gold'
                      : 'border-divine-darker-gray text-gray-500'
                  }`}
                >
                  {status === 'completed' ? <Check className="h-5 w-5" /> : index + 1}
                </div>
                <span
                  className={`text-sm font-semibold ${
                    status === 'upcoming' ? 'text-gray-500' : 'text-divine-white'
                  }`}
                >
                  {label}
                </span>
                {index < stepLabels.length - 1 && (
                  <span className="hidden sm:block h-px w-10 bg-divine-darker-gray" />
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-divine-dark-gray border border-divine-darker-gray rounded-xl p-5 md:p-10">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-heading font-bold mb-6">Select Your Service</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {services.map((service) => {
                    const price = service.isCallForQuote
                      ? 'Call for Quote'
                      : `${formatPrice(service.price.midSize)} - ${formatPrice(
                          service.price.fullSize,
                        )}`;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setServiceId(service.id)}
                        className={`relative text-left rounded-lg border p-4 md:p-5 transition-all ${
                          serviceId === service.id
                            ? 'border-divine-gold shadow-[0_0_20px_rgba(201,168,76,0.35)]'
                            : 'border-divine-darker-gray hover:border-divine-gold/60'
                        }`}
                      >
                        {serviceId === service.id && (
                          <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-divine-gold text-divine-black">
                            <Check className="h-4 w-4" />
                          </span>
                        )}
                        <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                        <p className="text-sm text-divine-gold mb-2">{price}</p>
                        <p className="text-sm text-gray-400 mb-2">{service.duration}</p>
                        <p className="text-sm text-gray-400">{service.description}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Add-Ons</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addOnOptions.map((addOn) => {
                      const selected = selectedAddOns.some((item) => item.id === addOn.id);
                      const needsQuantity = addOn.id === 'shampoo-seat' || addOn.id === 'shampoo-mat';
                      const maxQuantity = addOn.id === 'shampoo-seat' ? 6 : 4;
                      return (
                        <div
                          key={addOn.id}
                          className={`rounded-lg border p-4 transition-all ${
                            selected
                              ? 'border-divine-gold bg-divine-darker-gray/70'
                              : 'border-divine-darker-gray'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold">{addOn.name}</p>
                              <p className="text-sm text-divine-gold">{addOn.price}</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() => toggleAddOn(addOn.id)}
                              className="h-4 w-4 accent-divine-gold"
                              aria-label={`Select ${addOn.name}`}
                            />
                          </div>
                          {needsQuantity && selected && (
                            <div className="mt-3 flex items-center gap-2">
                              <Label htmlFor={`${addOn.id}-qty`} className="text-sm text-gray-400">
                                Quantity
                              </Label>
                              <input
                                id={`${addOn.id}-qty`}
                                type="number"
                                min={1}
                                max={maxQuantity}
                                value={addOnQuantities[addOn.id] ?? 1}
                                onChange={(event) =>
                                  updateAddOnQuantity(addOn.id, Number(event.target.value))
                                }
                                className="w-20 rounded-md bg-divine-black border border-divine-darker-gray px-2 py-1 text-sm"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={goNext}
                    disabled={!serviceId}
                    className="w-full sm:w-auto bg-divine-gold text-divine-black font-semibold"
                  >
                    Next
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-heading font-bold mb-6">Vehicle & Location</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <button
                    type="button"
                    onClick={() => setVehicleType('midsize')}
                    className={`rounded-lg border p-4 text-left ${
                      vehicleType === 'midsize'
                        ? 'border-divine-gold'
                        : 'border-divine-darker-gray'
                    }`}
                  >
                    <p className="font-semibold">Mid-Size / Sedan / Small SUV</p>
                    <p className="text-sm text-gray-400">
                      {selectedService?.isCallForQuote
                        ? 'Call for Quote'
                        : formatPrice(selectedService?.price.midSize ?? 0)}
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVehicleType('fullsize')}
                    className={`rounded-lg border p-4 text-left ${
                      vehicleType === 'fullsize'
                        ? 'border-divine-gold'
                        : 'border-divine-darker-gray'
                    }`}
                  >
                    <p className="font-semibold">Full-Size / 3-Row SUV / Truck</p>
                    <p className="text-sm text-gray-400">
                      {selectedService?.isCallForQuote
                        ? 'Call for Quote'
                        : formatPrice(selectedService?.price.fullSize ?? 0)}
                    </p>
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <Label htmlFor="vehicle-details" className="text-sm text-gray-300">
                      Vehicle Details
                    </Label>
                    <Input
                      id="vehicle-details"
                      value={vehicleDetails}
                      onChange={(event) => setVehicleDetails(event.target.value)}
                      placeholder="2022 BMW X5"
                      className="mt-2 bg-divine-black border-divine-darker-gray"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service-address" className="text-sm text-gray-300">
                      Service Address
                    </Label>
                    <Input
                      id="service-address"
                      value={serviceAddress}
                      onChange={(event) => setServiceAddress(event.target.value)}
                      placeholder="Full address"
                      className="mt-2 bg-divine-black border-divine-darker-gray"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <Label htmlFor="gate-code" className="text-sm text-gray-300">
                    Gate Code / Access Instructions (optional)
                  </Label>
                  <Input
                    id="gate-code"
                    value={gateCode}
                    onChange={(event) => setGateCode(event.target.value)}
                    placeholder="Gate code or access notes"
                    className="mt-2 bg-divine-black border-divine-darker-gray"
                  />
                </div>

                <div className="mt-6 flex flex-col gap-4 border-t border-divine-darker-gray pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <Button variant="ghost" onClick={goBack} className="w-full sm:w-auto">
                    Back
                  </Button>
                  <div className="text-right sm:text-left">
                    <p className="text-sm text-gray-400">Estimated Total</p>
                    <p className="text-2xl font-bold text-divine-gold">
                      {totalPrice ? formatDollars(totalPrice) : 'Call for Quote'}
                    </p>
                  </div>
                  <Button
                    onClick={goNext}
                    disabled={!vehicleDetails || !serviceAddress}
                    className="w-full sm:w-auto bg-divine-gold text-divine-black font-semibold"
                  >
                    Next
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-heading font-bold mb-6">Pick Date & Time</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  {[calendarMonth, addMonths(calendarMonth, 1)].map((month) => (
                    <div key={month.toISOString()} className="rounded-lg border border-divine-darker-gray p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="font-semibold">{format(month, 'MMMM yyyy')}</div>
                        {isSameDay(month, calendarMonth) && (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setCalendarMonth(addMonths(calendarMonth, -1))}
                              className="p-2 text-gray-400 hover:text-divine-gold"
                              aria-label="Previous month"
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}
                              className="p-2 text-gray-400 hover:text-divine-gold"
                              aria-label="Next month"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                      {loadingCalendar ? (
                        <div className="flex items-center justify-center py-10 text-gray-400">
                          <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                      ) : (
                        <div className="grid grid-cols-7 gap-1.5 text-center text-sm">
                          {(isSameDay(month, calendarMonth) ? monthDays : nextMonthDays).map((day) => {
                            const disabled = isDateDisabled(day);
                            const selected = preferredDate && isSameDay(day, preferredDate);
                            const isToday = isSameDay(day, new Date());
                            return (
                              <button
                                key={day.toISOString()}
                                type="button"
                                disabled={disabled}
                                onClick={() => {
                                  setPreferredDate(day);
                                  setPreferredTime('');
                                }}
                                className={`rounded-md py-2 ${
                                  selected
                                    ? 'bg-divine-gold text-divine-black'
                                    : isToday
                                    ? 'border border-divine-gold/60 text-divine-gold'
                                    : disabled
                                    ? 'text-gray-600 opacity-40 cursor-not-allowed'
                                    : 'text-gray-300 hover:bg-divine-gold/20'
                                }`}
                              >
                                {format(day, 'd')}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
                  {loadingTimes ? (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Loading times...
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => {
                        const booked = bookedTimes.includes(slot);
                        const selected = preferredTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={booked || !preferredDate}
                            onClick={() => setPreferredTime(slot)}
                            className={`rounded-md border px-3 py-2 text-sm ${
                              selected
                                ? 'border-divine-gold bg-divine-gold text-divine-black'
                                : booked
                                ? 'border-divine-darker-gray text-gray-600 cursor-not-allowed'
                                : 'border-divine-darker-gray text-gray-300 hover:border-divine-gold/70'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button variant="ghost" onClick={goBack} className="w-full sm:w-auto">
                    Back
                  </Button>
                  <Button
                    onClick={goNext}
                    disabled={!preferredDate || !preferredTime}
                    className="w-full sm:w-auto bg-divine-gold text-divine-black font-semibold"
                  >
                    Next
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-heading font-bold mb-6">Your Details</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                  <div className="lg:col-span-2 space-y-5">
                    <div>
                      <Label htmlFor="customer-name">Full Name</Label>
                      <Input
                        id="customer-name"
                        value={customerName}
                        onChange={(event) => setCustomerName(event.target.value)}
                        className="mt-2 bg-divine-black border-divine-darker-gray"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customer-email">Email</Label>
                      <Input
                        id="customer-email"
                        type="email"
                        value={customerEmail}
                        onChange={(event) => setCustomerEmail(event.target.value)}
                        className="mt-2 bg-divine-black border-divine-darker-gray"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customer-phone">Phone</Label>
                      <Input
                        id="customer-phone"
                        value={customerPhone}
                        onChange={(event) => setCustomerPhone(event.target.value)}
                        className="mt-2 bg-divine-black border-divine-darker-gray"
                      />
                    </div>
                    <div>
                      <Label htmlFor="special-instructions">Special Instructions</Label>
                      <Textarea
                        id="special-instructions"
                        value={specialInstructions}
                        onChange={(event) => setSpecialInstructions(event.target.value)}
                        className="mt-2 bg-divine-black border-divine-darker-gray"
                      />
                    </div>
                  </div>
                  <div className="card-base p-4">
                    <h3 className="text-lg font-semibold mb-3">Booking Summary</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>
                        <span className="text-gray-400">Service:</span>{' '}
                        {selectedService?.name ?? '—'}
                      </p>
                      <p>
                        <span className="text-gray-400">Vehicle:</span> {vehicleType} —{' '}
                        {vehicleDetails}
                      </p>
                      <p>
                        <span className="text-gray-400">Add-ons:</span>{' '}
                        {summaryAddOns.length ? summaryAddOns.join(', ') : 'None'}
                      </p>
                      <p>
                        <span className="text-gray-400">Date:</span>{' '}
                        {preferredDate ? format(preferredDate, 'PPP') : '—'}
                      </p>
                      <p>
                        <span className="text-gray-400">Time:</span>{' '}
                        {preferredTime || '—'}
                      </p>
                      <p>
                        <span className="text-gray-400">Address:</span> {serviceAddress}
                      </p>
                    </div>
                    <div className="mt-4 border-t border-divine-darker-gray pt-4">
                      <p className="text-sm text-gray-400">Total</p>
                      <p className="text-2xl font-bold text-divine-gold">
                        {totalPrice ? formatDollars(totalPrice) : 'Call for Quote'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button variant="ghost" onClick={goBack} className="w-full sm:w-auto">
                    Back
                  </Button>
                  <Button
                    onClick={goNext}
                    disabled={!customerName || !customerEmail || !customerPhone}
                    className="w-full sm:w-auto bg-divine-gold text-divine-black font-semibold"
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-heading font-bold mb-4">Payment Review</h2>
                <p className="text-gray-400 mb-6">
                  Review your booking details below. Demo mode does not process real payments.
                </p>

                {selectedService?.isCallForQuote && (
                  <div className="mb-6 rounded-lg border border-divine-gold/50 bg-divine-black p-4 text-divine-gold">
                    Ceramic Coating requires a custom quote. Please call us to finalize pricing.
                  </div>
                )}

                {errorMessage && (
                  <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-200">
                    {errorMessage}
                  </div>
                )}

                <div className="card-base bg-divine-black/60 p-5 mb-6">
                  <h3 className="text-lg font-semibold mb-3">Booking Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div>
                      <p>
                        <span className="text-gray-400">Service:</span>{' '}
                        {selectedService?.name ?? '—'}
                      </p>
                      <p>
                        <span className="text-gray-400">Vehicle:</span> {vehicleType} —{' '}
                        {vehicleDetails}
                      </p>
                      <p>
                        <span className="text-gray-400">Add-ons:</span>{' '}
                        {summaryAddOns.length ? summaryAddOns.join(', ') : 'None'}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="text-gray-400">Date:</span>{' '}
                        {preferredDate ? format(preferredDate, 'PPP') : '—'}
                      </p>
                      <p>
                        <span className="text-gray-400">Time:</span> {preferredTime || '—'}
                      </p>
                      <p>
                        <span className="text-gray-400">Address:</span> {serviceAddress}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-divine-darker-gray pt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total</p>
                      <p className="text-3xl font-bold text-divine-gold">
                        {totalPrice ? formatDollars(totalPrice) : 'Call for Quote'}
                      </p>
                    </div>
                    <div className="rounded-lg border border-divine-darker-gray bg-divine-dark-gray px-4 py-3 text-sm text-gray-400">
                      Mock card ending in 4242
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Button variant="ghost" onClick={goBack} className="w-full sm:w-auto">
                    Back
                  </Button>
                  <Button
                    onClick={handleCheckout}
                    disabled={submitting || selectedService?.isCallForQuote}
                    className="w-full sm:w-auto bg-divine-gold text-divine-black font-semibold"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Processing payment...
                      </span>
                    ) : (
                      `Confirm & Pay ${totalPrice ? formatDollars(totalPrice) : ''}`
                    )}
                  </Button>
                  <span className="text-xs text-gray-500">
                    Demo Mode — no actual payment will be processed
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="fixed bottom-4 left-4 z-40 rounded-full border border-divine-gold/60 bg-divine-black/80 px-3 py-1 text-xs text-divine-gold">
        🔧 Demo Mode
      </div>
    </div>
  );
}

function formatDollars(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}
