'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '@/components/ServiceCard';
import { services, addOns, comparisonFeatures, packageTiers } from '@/data/services';
import { ArrowDown, Check, Plus } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ServicesPage() {
  const sections = useMemo(() => {
    const serviceSections = services.map((service) => ({
      id: service.id,
      label: service.name,
    }));
    return [
      { id: 'comparison', label: 'Comparison' },
      ...serviceSections,
      { id: 'add-ons', label: 'Add-Ons' },
      { id: 'faq', label: 'FAQ' },
    ];
  }, []);
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      if (sections[0]) setActiveSection(sections[0].id);
      return;
    }

    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.1 },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="min-h-screen pt-20">
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
              Our Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Premium mobile detailing packages designed to exceed your expectations. From regular maintenance to complete restoration, we have a service for every need.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="sticky top-20 z-30 border-b border-divine-darker-gray bg-divine-black/85 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto py-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-divine-gold focus-visible:ring-offset-2 focus-visible:ring-offset-divine-black ${
                  activeSection === section.id
                    ? 'bg-divine-gold text-divine-black'
                    : 'text-gray-300 hover:text-divine-gold'
                }`}
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <section id="comparison" className="section-padding bg-divine-black scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-divine-white mb-3">
              Package Comparison
            </h2>
            <p className="text-lg text-gray-400">
              See what’s included in each detailing tier.
            </p>
          </motion.div>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="min-w-[720px] w-full text-left" aria-label="Service package comparison">
              <thead className="bg-divine-darker-gray/80">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-divine-gold">Feature</th>
                  {packageTiers.map((tier) => (
                    <th key={tier.id} className="px-6 py-4 text-sm font-semibold text-divine-white">
                      {tier.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr
                    key={feature.label}
                    className={`border-t border-divine-darker-gray ${
                      index % 2 === 0 ? 'bg-divine-dark-gray/40' : 'bg-transparent'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-300">{feature.label}</td>
                    {packageTiers.map((tier) => (
                      <td key={`${feature.label}-${tier.id}`} className="px-6 py-4">
                        {feature.includedIn[tier.id] ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-divine-gold/10 text-divine-gold">
                            <Check className="h-4 w-4" />
                          </span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-padding bg-divine-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {services.map((service, index) => {
              const tierInfo = packageTiers.find((tier) => tier.id === service.id);
              const previousTier = tierInfo?.includesEverythingFrom
                ? packageTiers.find((tier) => tier.id === tierInfo.includesEverythingFrom)
                : undefined;

              return (
                <div key={service.id} id={service.id} className="scroll-mt-28">
                  {previousTier && (
                    <div className="mb-4 flex items-center gap-3 text-sm text-gray-400">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-divine-gold/40 text-divine-gold">
                        <ArrowDown className="h-4 w-4" />
                      </span>
                      <span>
                        Includes everything in{' '}
                        <span className="text-divine-gold font-semibold">
                          {previousTier.label}
                        </span>
                      </span>
                      <span className="hidden md:block h-px flex-1 bg-divine-darker-gray" />
                    </div>
                  )}
                  <ServiceCard service={service} variant="detailed" index={index} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="add-ons" className="section-padding bg-divine-dark-gray scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-divine-white mb-4">
              Add-Ons
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Enhance your detailing package with our premium add-on services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addOn, index) => (
              <motion.div
                key={addOn.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="card-base card-hover p-6 card-shimmer"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-divine-gold/10 flex items-center justify-center flex-shrink-0">
                    <Plus className="w-4 h-4 text-divine-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-divine-white mb-1">
                      {addOn.name}
                    </h3>
                    <p className="text-2xl font-bold text-divine-gold mb-2">
                      {addOn.price}
                    </p>
                  </div>
                </div>
                {addOn.description && (
                  <p className="text-sm text-gray-400">{addOn.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section-padding bg-divine-black border-t border-white/5 scroll-mt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-divine-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-400">
              Quick answers to common questions about our mobile detailing.
            </p>
          </motion.div>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="location" className="border border-white/10 rounded-xl px-4">
              <AccordionTrigger className="text-divine-white data-[state=open]:text-divine-gold">
                Do you come to my location?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Yes, we service at your home or office.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="water" className="border border-white/10 rounded-xl px-4">
              <AccordionTrigger className="text-divine-white data-[state=open]:text-divine-gold">
                What is your water system?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                We use a deionized water filtration system for spot-free results, even in the sun.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="plans" className="border border-white/10 rounded-xl px-4">
              <AccordionTrigger className="text-divine-white data-[state=open]:text-divine-gold">
                Do you offer monthly plans?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Yes, our Maintenance Detail is for monthly recurring customers at discounted rates.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="booking" className="border border-white/10 rounded-xl px-4">
              <AccordionTrigger className="text-divine-white data-[state=open]:text-divine-gold">
                How do I book?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Call us at 561-467-4866, email info@divinedetail.com, or use our contact form.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="areas" className="border border-white/10 rounded-xl px-4">
              <AccordionTrigger className="text-divine-white data-[state=open]:text-divine-gold">
                What areas do you serve?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Palm Beach and surrounding areas.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="section-padding bg-divine-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-divine-white mb-4">
              Not sure which service is right for you?
            </h3>
            <p className="text-gray-300 mb-6">
              Contact us and we'll help you choose the perfect detailing package for your vehicle.
            </p>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="inline-block text-divine-gold text-xl font-semibold hover:text-divine-gold/90 transition-colors"
            >
              Call us: {COMPANY_INFO.phoneDisplay}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
