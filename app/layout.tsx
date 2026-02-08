import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';
import CallNowButton from '@/components/CallNowButton';

export const metadata: Metadata = {
  title: 'Divine Detail | Premium Mobile Auto Detailing | Palm Beach, FL',
  description: 'Palm Beach\'s premier mobile auto detailing service. Professional detailing at your home or office, 7 days a week. Spot-free water system and premium products.',
  keywords: ['auto detailing', 'mobile detailing', 'Palm Beach', 'car wash', 'ceramic coating', 'Florida'],
  openGraph: {
    title: 'Divine Detail | Premium Mobile Auto Detailing',
    description: 'Palm Beach\'s premier mobile auto detailing service',
    type: 'website',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divine Detail | Premium Mobile Auto Detailing',
    description: 'Palm Beach\'s premier mobile auto detailing service',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTopButton />
        <CallNowButton />
      </body>
    </html>
  );
}
