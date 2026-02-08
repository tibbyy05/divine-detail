'use client';

import { Service, ServiceTier } from '@/data/services';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  variant?: 'compact' | 'detailed';
  index?: number;
}

const tierStyles: Record<ServiceTier, string> = {
  silver: 'border-gray-400 text-gray-300 bg-gray-500/10',
  gold: 'border-divine-gold text-divine-gold bg-divine-gold/10',
  platinum: 'border-slate-300 text-slate-100 bg-slate-200/10',
  diamond: 'border-sky-300 text-sky-200 bg-sky-200/10',
};

function ServiceCard({ service, variant = 'compact', index = 0 }: ServiceCardProps) {
  if (variant === 'detailed') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="group card-base card-hover p-8"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-heading font-semibold text-divine-white">
                {service.name}
              </h3>
              {service.tier && (
                <Badge variant="outline" className={tierStyles[service.tier]}>
                  {service.tier === 'silver'
                    ? 'Silver'
                    : service.tier === 'gold'
                    ? 'Gold'
                    : service.tier === 'platinum'
                    ? 'Platinum'
                    : 'Diamond'}
                </Badge>
              )}
              {service.badge && (
                <Badge variant="outline" className="border-divine-gold text-divine-gold">
                  {service.badge}
                </Badge>
              )}
            </div>
            {service.tagline && (
              <p className="text-divine-gold text-sm mb-3">{service.tagline}</p>
            )}
            <p className="text-gray-400 mb-4">{service.description}</p>
            <p className="text-sm text-gray-500">Duration: {service.duration}</p>
          </div>
          <div className="md:text-right">
            {service.isCallForQuote ? (
              <p className="text-2xl font-bold text-divine-gold">Call for Quote</p>
            ) : (
              <>
                <p className="text-sm text-gray-400 mb-1">Mid-Size/Sedans</p>
                <p className="text-3xl font-bold text-divine-gold mb-3">
                  {formatPrice(service.price.midSize)}
                </p>
                <p className="text-sm text-gray-400 mb-1">Full-Size SUVs/Trucks</p>
                <p className="text-3xl font-bold text-divine-gold">
                  {formatPrice(service.price.fullSize)}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="border-t border-divine-darker-gray pt-6 mb-6">
          <h4 className="text-sm font-semibold text-divine-gold mb-3 uppercase tracking-wider">
            What's Included
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {service.inclusions.map((inclusion, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                <span className="text-divine-gold mt-1">✓</span>
                <span>{inclusion}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link href={`/book?service=${encodeURIComponent(service.id)}`}>
          <Button className="w-full md:w-auto primary-button focus-visible:ring-2 focus-visible:ring-divine-gold focus-visible:ring-offset-2 focus-visible:ring-offset-divine-black">
            Book Now
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="card-base card-hover p-6 group min-h-[320px]"
    >
      {service.badge && (
        <Badge variant="outline" className="border-divine-gold text-divine-gold mb-3">
          {service.badge}
        </Badge>
      )}
      {service.tier && (
        <Badge variant="outline" className={`mb-3 ${tierStyles[service.tier]}`}>
          {service.tier === 'silver'
            ? 'Silver'
            : service.tier === 'gold'
            ? 'Gold'
            : service.tier === 'platinum'
            ? 'Platinum'
            : 'Diamond'}
        </Badge>
      )}
      <h3 className="text-xl font-heading font-semibold text-divine-white mb-2">
        {service.name}
      </h3>
      {service.tagline && (
        <p className="text-divine-gold text-sm mb-3">{service.tagline}</p>
      )}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>
      <div className="flex items-center justify-between mb-4">
        {service.isCallForQuote ? (
          <p className="text-lg font-bold text-divine-gold">Call for Quote</p>
        ) : (
          <div>
            <p className="text-xs text-gray-500">Starting at</p>
            <p className="text-xl font-bold text-divine-gold">
              {formatPrice(service.price.midSize)}
            </p>
          </div>
        )}
      </div>
      <Link href="/services">
        <Button
          variant="outline"
          className="w-full secondary-button focus-visible:ring-2 focus-visible:ring-divine-gold focus-visible:ring-offset-2 focus-visible:ring-offset-divine-black"
        >
          Learn More
        </Button>
      </Link>
    </motion.div>
  );
}

export default ServiceCard;
