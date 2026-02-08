'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { COMPANY_INFO } from '@/lib/constants';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/book', label: 'Book Now' },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      firstMobileLinkRef.current?.focus();
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-divine-black/90 backdrop-blur-lg border-b border-divine-darker-gray'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center" aria-label="Divine Detail home">
              <Image
                src="/Logo1.png"
                alt="Divine Detail logo"
                width={420}
                height={112}
                className="h-14 md:h-16 w-auto"
                priority
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative text-sm font-medium text-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-divine-gold focus-visible:ring-offset-2 focus-visible:ring-offset-divine-black ${
                    pathname === link.href
                      ? 'text-divine-gold'
                      : 'hover:text-divine-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-divine-gold transition-transform duration-300 ${
                      pathname === link.href ? 'scale-x-100' : 'group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              ))}
              <Link href="/book">
                <Button
                  size="sm"
                  className="primary-button px-4 py-2 text-sm focus-visible:ring-2 focus-visible:ring-divine-gold focus-visible:ring-offset-2 focus-visible:ring-offset-divine-black"
                >
                  Book Now
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-divine-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-divine-gold focus-visible:ring-offset-2 focus-visible:ring-offset-divine-black"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
            id="mobile-menu"
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setIsMobileMenuOpen(false);
              }
            }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-divine-black/95 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            />
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-divine-dark-gray border-l border-divine-darker-gray shadow-2xl">
              <div className="flex flex-col h-full pt-24 px-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Link
                      href={link.href}
                      ref={index === 0 ? firstMobileLinkRef : undefined}
                      className={`block py-4 text-lg font-medium transition-colors border-b border-divine-darker-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-divine-gold focus-visible:ring-offset-2 focus-visible:ring-offset-divine-black ${
                        pathname === link.href
                          ? 'text-divine-gold'
                          : 'text-divine-white hover:text-divine-gold'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8"
                >
                  <Link href="/book">
                    <Button
                      size="lg"
                      className="w-full bg-divine-gold text-divine-black font-semibold transition-all hover:bg-divine-gold/90 hover:scale-[1.02] hover:shadow-[0_0_18px_rgba(201,168,76,0.45)] focus-visible:ring-2 focus-visible:ring-divine-gold focus-visible:ring-offset-2 focus-visible:ring-offset-divine-black"
                    >
                      Book Now
                    </Button>
                  </Link>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-md border border-divine-gold/60 px-4 py-3 text-sm font-semibold text-divine-gold transition-colors hover:bg-divine-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-divine-gold focus-visible:ring-offset-2 focus-visible:ring-offset-divine-black"
                  >
                    Call {COMPANY_INFO.phoneDisplay}
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
