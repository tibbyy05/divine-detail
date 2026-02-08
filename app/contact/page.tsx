'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, MapPin, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Toaster, toast } from 'react-hot-toast';
import { services } from '@/data/services';
import { COMPANY_INFO } from '@/lib/constants';
import { formatPrice, normalizeValue } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

export default function ContactPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleType: '',
    service: '',
    preferredDate: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shakeFields, setShakeFields] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (!serviceParam) return;

    const matchedService = services.find((service) => {
      const normalizedId = normalizeValue(service.id);
      const normalizedName = normalizeValue(service.name);
      const normalizedParam = normalizeValue(serviceParam);
      return normalizedParam === normalizedId || normalizedParam === normalizedName;
    });

    if (matchedService) {
      setFormData((prev) => ({ ...prev, service: matchedService.id }));
    }
  }, [searchParams]);

  const estimator = useMemo(() => {
    if (!formData.vehicleType || !formData.service) {
      return null;
    }
    const selectedService = services.find((service) => service.id === formData.service);
    if (!selectedService) {
      return null;
    }
    if (selectedService.isCallForQuote) {
      return 'Call for quote';
    }
    if (formData.vehicleType === 'other') {
      return 'Contact us for a custom estimate';
    }
    const priceKey = formData.vehicleType === 'fullsize' ? 'fullSize' : 'midSize';
    return formatPrice(selectedService.price[priceKey]);
  }, [formData.service, formData.vehicleType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) nextErrors.phone = 'Please enter your phone number.';
    if (!formData.vehicleType) nextErrors.vehicleType = 'Please select a vehicle type.';
    if (!formData.service) nextErrors.service = 'Please select a service.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const nextShake = Object.keys(nextErrors).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {},
      );
      setShakeFields(nextShake);
      setTimeout(() => setShakeFields({}), 450);
      toast.error('Please fix the highlighted fields and try again.');
      return;
    }

    setErrors({});
    toast.success("We'll get back to you shortly. Thank you!");

    setFormData({
      name: '',
      email: '',
      phone: '',
      vehicleType: '',
      service: '',
      preferredDate: '',
      message: '',
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <Toaster position="top-right" />

      <section className="relative py-20 md:py-28 bg-gradient-to-b from-divine-black via-divine-dark-gray to-divine-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.1),transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-divine-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to experience premium mobile detailing? Get in touch with us today to schedule your appointment.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-divine-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="card-base p-8 sticky top-24">
                <h2 className="text-2xl font-heading font-bold text-divine-white mb-6">
                  Get in Touch
                </h2>

                <div className="space-y-6">
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="flex items-start gap-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-divine-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-divine-gold/20 transition-colors">
                      <Phone className="w-5 h-5 text-divine-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Phone</p>
                      <p className="text-divine-white font-semibold group-hover:text-divine-gold transition-colors">
                        {COMPANY_INFO.phoneDisplay}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="flex items-start gap-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-divine-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-divine-gold/20 transition-colors">
                      <Mail className="w-5 h-5 text-divine-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Email</p>
                      <p className="text-divine-white font-semibold group-hover:text-divine-gold transition-colors">
                        {COMPANY_INFO.email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-divine-gold/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-divine-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Hours</p>
                      <p className="text-divine-white font-semibold">
                        {COMPANY_INFO.hoursLabel}
                      </p>
                      <p className="text-gray-400 text-sm">{COMPANY_INFO.hoursDetail}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-divine-gold/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-divine-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Service Area</p>
                      <p className="text-divine-white font-semibold">
                        {COMPANY_INFO.serviceArea}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-divine-darker-gray">
                  <p className="text-sm text-gray-400 mb-4">Follow us on social media</p>
                  <div className="flex items-center gap-3">
                    <a
                      href={COMPANY_INFO.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-divine-darker-gray flex items-center justify-center text-gray-400 hover:text-divine-gold hover:bg-divine-gold/10 transition-all"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href={COMPANY_INFO.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-divine-darker-gray flex items-center justify-center text-gray-400 hover:text-divine-gold hover:bg-divine-gold/10 transition-all"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="card-base p-8">
                <h2 className="text-2xl font-heading font-bold text-divine-white mb-6">
                  Send Us a Message
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  Ready to book?{' '}
                  <a href="/book" className="text-divine-gold hover:text-divine-gold/90">
                    Use our online booking system
                  </a>
                  .
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={shakeFields.name ? 'animate-shake' : ''}>
                      <Label htmlFor="name" className="text-xs uppercase tracking-widest text-gray-400">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="mt-2 bg-[#1A1A1A] border-white/10 text-divine-white rounded-lg focus:border-divine-gold focus:ring-1 focus:ring-divine-gold/60"
                        placeholder="Your name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-2 text-sm text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className={shakeFields.email ? 'animate-shake' : ''}>
                      <Label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-400">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="mt-2 bg-[#1A1A1A] border-white/10 text-divine-white rounded-lg focus:border-divine-gold focus:ring-1 focus:ring-divine-gold/60"
                        placeholder="your@email.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-2 text-sm text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={shakeFields.phone ? 'animate-shake' : ''}>
                      <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-gray-400">
                        Phone *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="mt-2 bg-[#1A1A1A] border-white/10 text-divine-white rounded-lg focus:border-divine-gold focus:ring-1 focus:ring-divine-gold/60"
                        placeholder="(555) 123-4567"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-2 text-sm text-red-400">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className={shakeFields.vehicleType ? 'animate-shake' : ''}>
                      <Label htmlFor="vehicleType" className="text-xs uppercase tracking-widest text-gray-400">
                        Vehicle Type *
                      </Label>
                      <Select
                        value={formData.vehicleType}
                        onValueChange={(value) => handleChange('vehicleType', value)}
                      >
                        <SelectTrigger
                          className="mt-2 bg-[#1A1A1A] border-white/10 text-divine-white rounded-lg focus:border-divine-gold focus:ring-1 focus:ring-divine-gold/60"
                          aria-invalid={Boolean(errors.vehicleType)}
                          aria-describedby={errors.vehicleType ? 'vehicleType-error' : undefined}
                        >
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent className="bg-divine-darker-gray border-divine-darker-gray text-divine-white">
                          <SelectItem value="sedan">Sedan/Small SUV</SelectItem>
                          <SelectItem value="fullsize">Full-Size SUV/Truck</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.vehicleType && (
                        <p id="vehicleType-error" className="mt-2 text-sm text-red-400">
                          {errors.vehicleType}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={shakeFields.service ? 'animate-shake' : ''}>
                      <Label htmlFor="service" className="text-xs uppercase tracking-widest text-gray-400">
                        Service Interested In *
                      </Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => handleChange('service', value)}
                      >
                        <SelectTrigger
                          className="mt-2 bg-[#1A1A1A] border-white/10 text-divine-white rounded-lg focus:border-divine-gold focus:ring-1 focus:ring-divine-gold/60"
                          aria-invalid={Boolean(errors.service)}
                          aria-describedby={errors.service ? 'service-error' : undefined}
                        >
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-divine-darker-gray border-divine-darker-gray text-divine-white">
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && (
                        <p id="service-error" className="mt-2 text-sm text-red-400">
                          {errors.service}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="preferredDate" className="text-xs uppercase tracking-widest text-gray-400">
                        Preferred Date
                      </Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleChange('preferredDate', e.target.value)}
                        className="mt-2 bg-[#1A1A1A] border-white/10 text-divine-white rounded-lg focus:border-divine-gold focus:ring-1 focus:ring-divine-gold/60"
                      />
                    </div>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-[#1A1A1A] p-4">
                    <p className="text-sm text-gray-400">Estimated Price</p>
                    <p className="mt-2 text-lg font-semibold text-divine-gold" aria-live="polite">
                      {estimator ?? 'Select a vehicle type and service'}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-xs uppercase tracking-widest text-gray-400">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="mt-2 bg-[#1A1A1A] border-white/10 text-divine-white rounded-lg focus:border-divine-gold focus:ring-1 focus:ring-divine-gold/60 resize-none"
                      placeholder="Tell us about your vehicle and any specific needs..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full primary-button text-lg">
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-divine-dark-gray border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg overflow-hidden border border-divine-darker-gray">
            <iframe
              title="Divine Detail service area map"
              src="https://www.google.com/maps?q=Palm%20Beach,%20FL&output=embed"
              className="w-full h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
