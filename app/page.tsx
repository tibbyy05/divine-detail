'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';
import CTABanner from '@/components/CTABanner';
import TrustBadge from '@/components/TrustBadge';
import FeatureCard from '@/components/FeatureCard';
import { services, whyChooseUs } from '@/data/services';
import { Calendar, MapPin, Droplets, Award, Truck, Sparkles, Instagram } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

export default function HomePage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 300], [0, -60]);

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <video
            className="absolute inset-0 h-full w-full object-cover object-[center_30%] md:object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src="https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/Website%20Stuff/Divine%20Detail/0123.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-divine-black/55" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-divine-white mb-6 leading-tight">
              Palm Beach's Premier
              <br />
              <span className="text-divine-gold">Mobile Detailing</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We come to you — home or office. 7 days a week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button
                  size="lg"
                  className="primary-button text-lg px-8 py-6"
                >
                  Book Now
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="secondary-button text-lg px-8 py-6"
                >
                  View Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-divine-gold opacity-50"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-divine-dark-gray border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TrustBadge
              icon={Calendar}
              title="7 Days a Week"
              description="Available every day"
              index={0}
            />
            <TrustBadge
              icon={Truck}
              title="Mobile Service"
              description="We come to you"
              index={1}
            />
            <TrustBadge
              icon={Droplets}
              title="Spot-Free Water"
              description="Deionized system"
              index={2}
            />
            <TrustBadge
              icon={Award}
              title="Premium Products"
              description="Top-quality only"
              index={3}
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-divine-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-divine-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose from our range of professional detailing packages
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} variant="compact" index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-divine-dark-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-divine-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the Divine Detail difference
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={MapPin}
              title="We Come To You"
              description="Enjoy premium detailing at your home or office. No need to disrupt your day or wait at a shop."
              index={0}
            />
            <FeatureCard
              icon={Droplets}
              title="Spot-Free Water System"
              description="Our deionized water filtration system ensures a perfect, spot-free finish every time."
              index={1}
            />
            <FeatureCard
              icon={Sparkles}
              title="Premium Products"
              description="We use only the finest professional-grade products for exceptional results that last."
              index={2}
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-divine-dark-gray border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-divine-white mb-4">
              Follow Our Work
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See recent transformations on Instagram
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              '/Image1.png',
              '/Image2.png',
              '/Image3.png',
              '/Image4.png',
              '/Image5.png',
              '/Image6.png',
            ].map((src, index) => (
              <a
                key={`instagram-${src}`}
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Divine Detail on Instagram"
                className="group relative aspect-square overflow-hidden rounded-lg border border-divine-darker-gray bg-divine-black"
              >
                <Image
                  src={src}
                  alt={`Divine Detail gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-3 right-3 text-divine-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Instagram className="h-5 w-5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Protect Your Investment"
        description="Ask about our monthly maintenance packages and fleet discounts. Keep your vehicle looking its best all year round."
        buttonText="Contact Us"
        buttonHref="/contact"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: COMPANY_INFO.name,
            url: 'https://divinedetail.com',
            telephone: COMPANY_INFO.phoneDisplay,
            email: COMPANY_INFO.email,
            areaServed: COMPANY_INFO.location,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Palm Beach',
              addressRegion: 'FL',
            },
            openingHours: 'Mo-Su 07:00-19:00',
            serviceType: [
              'Mobile Auto Detailing',
              'Interior Detailing',
              'Exterior Detailing',
              'Ceramic Coating',
            ],
          }),
        }}
      />
    </div>
  );
}
