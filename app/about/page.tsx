'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FeatureCard } from '@/components';
import { MapPin, Droplets, Award, Shield, Clock, Star } from 'lucide-react';

export default function AboutPage() {
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
              About Divine Detail
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Palm Beach's premier mobile auto detailing service, bringing professional-grade care directly to your doorstep.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-divine-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
          >
            <div className="card-base p-8 md:p-12">
              <h2 className="text-3xl font-heading font-bold text-divine-white mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  Divine Detail was founded with a simple yet powerful mission: to provide Palm Beach residents with the highest quality auto detailing services, delivered with the convenience of mobile service.
                </p>
                <p className="text-lg">
                  We understand that your time is valuable. That's why we bring our professional detailing expertise directly to your home or office. No more waiting in line, no more disrupting your day—just exceptional results at your convenience.
                </p>
                <p className="text-lg">
                  What sets us apart is our commitment to excellence in every detail. From our state-of-the-art spot-free deionized water system to our selection of premium professional-grade products, we spare no expense in delivering results that exceed expectations.
                </p>
              </div>
            </div>
          </motion.div>
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
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the Divine Detail advantage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={MapPin}
              title="Complete Mobile Service"
              description="We come to you, whether you're at home, the office, or anywhere in the Palm Beach area. Your convenience is our priority."
              index={0}
            />
            <FeatureCard
              icon={Droplets}
              title="Spot-Free Water System"
              description="Our advanced deionized water filtration system eliminates water spots, ensuring a flawless, streak-free finish every time."
              index={1}
            />
            <FeatureCard
              icon={Award}
              title="Premium Products Only"
              description="We use only the finest professional-grade products from trusted brands like Gyeon and Carpro for superior, long-lasting results."
              index={2}
            />
            <FeatureCard
              icon={Shield}
              title="Protect Your Investment"
              description="Your vehicle is a significant investment. Our meticulous care and attention to detail help maintain its value and appearance."
              index={3}
            />
            <FeatureCard
              icon={Clock}
              title="7 Days a Week"
              description="We're available seven days a week from 7am to 7pm, making it easy to find a time that works for your schedule."
              index={4}
            />
            <FeatureCard
              icon={Star}
              title="Exceptional Results"
              description="From basic maintenance to complete restoration, we deliver consistently outstanding results that exceed our clients' expectations."
              index={5}
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-divine-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-base p-8 md:p-12"
          >
            <h2 className="text-3xl font-heading font-bold text-divine-white mb-6">
              Our Commitment to Excellence
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                At Divine Detail, excellence isn't just a goal—it's our standard. Every vehicle we service receives the same meticulous attention to detail, whether it's a basic maintenance wash or a complete ceramic coating application.
              </p>
              <p className="text-lg">
                We believe in building lasting relationships with our clients through exceptional service, transparent pricing, and results that speak for themselves. Our growing list of satisfied customers and monthly clients is a testament to our commitment to quality.
              </p>
              <p className="text-lg">
                When you choose Divine Detail, you're not just getting a car wash—you're investing in professional care that protects and enhances your vehicle's appearance for years to come.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-divine-dark-gray to-divine-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-divine-white mb-6">
              Ready to Experience the Difference?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Book your appointment today and discover why Palm Beach trusts Divine Detail for all their auto detailing needs.
            </p>
            <Link href="/book">
              <Button size="lg" className="primary-button text-lg px-8">
                Book Your Service
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
