'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface TrustBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

function TrustBadge({ icon: Icon, title, description, index = 0 }: TrustBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex flex-col items-center text-center p-6 card-base card-hover"
    >
      <div className="w-16 h-16 rounded-full bg-divine-gold/10 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-divine-gold" />
      </div>
      <h3 className="text-lg font-semibold text-divine-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </motion.div>
  );
}

export default TrustBadge;
