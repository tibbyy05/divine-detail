'use client';

import { Phone } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

function CallNowButton() {
  return (
    <a
      href={`tel:${COMPANY_INFO.phone}`}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-divine-gold text-divine-black shadow-[0_0_24px_rgba(201,168,76,0.45)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-divine-gold focus-visible:ring-offset-2 focus-visible:ring-offset-divine-black md:hidden"
      aria-label={`Call ${COMPANY_INFO.phoneDisplay}`}
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}

export default CallNowButton;
