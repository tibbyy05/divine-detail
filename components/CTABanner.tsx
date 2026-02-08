'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import Link from 'next/link';

interface CTABannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

function CTABanner({ title, description, buttonText, buttonHref }: CTABannerProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-divine-dark-gray via-divine-darker-gray to-divine-dark-gray border-y border-divine-gold/30 py-16 md:py-24 px-4"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-divine-white mb-4">
          {title}
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <Link href={buttonHref}>
          <Button
            size="lg"
            className="primary-button text-lg px-8 focus-visible:ring-2 focus-visible:ring-divine-gold focus-visible:ring-offset-2 focus-visible:ring-offset-divine-black"
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </motion.section>
  );
}

export default CTABanner;
