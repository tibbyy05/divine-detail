import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';
import CallNowButton from '@/components/CallNowButton';

export const metadata: Metadata = {
  metadataBase: new URL('https://YOUR-NETLIFY-URL.netlify.app'),
  title: 'Divine Detail | Premium Mobile Auto Detailing | Palm Beach, FL',
  description:
    "Palm Beach's premier mobile auto detailing service. We bring professional detailing to your home or office. 7 days a week.",
  keywords: ['auto detailing', 'mobile detailing', 'Palm Beach', 'car wash', 'ceramic coating', 'Florida'],
  openGraph: {
    title: 'Divine Detail | Premium Mobile Auto Detailing',
    description: "Palm Beach's premier mobile auto detailing service. We come to you.",
    url: 'https://YOUR-NETLIFY-URL.netlify.app',
    siteName: 'Divine Detail',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Divine Detail - Premium Mobile Auto Detailing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divine Detail | Premium Mobile Auto Detailing',
    description: "Palm Beach's premier mobile auto detailing service.",
    images: ['/og-image.jpg'],
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
