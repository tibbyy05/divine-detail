import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

function Footer() {
  return (
    <footer className="bg-divine-dark-gray border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <Link href="/" className="inline-block mb-4" aria-label="Divine Detail home">
              <Image
                src="/Logo1.png"
                alt="Divine Detail logo"
                width={540}
                height={144}
                className="h-28 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Palm Beach's premier mobile auto detailing service. We bring professional detailing to your doorstep.
            </p>
            <p className="text-sm text-divine-gold font-medium">
              Serving {COMPANY_INFO.serviceArea}
            </p>
          </div>

          <div>
            <h3 className="text-divine-white font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-2 text-gray-400 hover:text-divine-gold transition-colors group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{COMPANY_INFO.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 text-gray-400 hover:text-divine-gold transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{COMPANY_INFO.email}</span>
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <div className="text-sm">
                  <p className="font-medium">{COMPANY_INFO.hoursLabel}</p>
                  <p>{COMPANY_INFO.hoursDetail}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-divine-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/services"
                className="block text-gray-400 hover:text-divine-gold transition-colors text-sm"
              >
                Our Services
              </Link>
              <Link
                href="/about"
                className="block text-gray-400 hover:text-divine-gold transition-colors text-sm"
              >
                About Us
              </Link>
              <Link
                href="/book"
                className="block text-gray-400 hover:text-divine-gold transition-colors text-sm"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col items-center justify-between gap-4">
          <p className="text-gray-400 text-sm text-center">
            © 2025 Divine Detail. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
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
    </footer>
  );
}

export default Footer;
