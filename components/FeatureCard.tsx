'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

function FeatureCard({ icon: Icon, title, description, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="card-base card-hover p-8"
    >
      <div className="w-14 h-14 rounded-full bg-divine-gold/10 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-divine-gold" />
      </div>
      <h3 className="text-xl font-heading font-semibold text-divine-white mb-3">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default FeatureCard;
