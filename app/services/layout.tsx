import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auto Detailing Services & Pricing | Divine Detail Palm Beach',
  description:
    'Explore Divine Detail’s mobile detailing packages and pricing in Palm Beach. Maintenance, Supreme, Premium, and Platinum tiers plus add-ons.',
  openGraph: {
    title: 'Auto Detailing Services & Pricing | Divine Detail Palm Beach',
    description:
      'Explore Divine Detail’s mobile detailing packages and pricing in Palm Beach. Maintenance, Supreme, Premium, and Platinum tiers plus add-ons.',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
