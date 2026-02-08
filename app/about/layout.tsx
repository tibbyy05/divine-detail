import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Divine Detail | Mobile Detailing Experts | Palm Beach, FL',
  description:
    'Meet Divine Detail, Palm Beach’s premium mobile auto detailing team. Spot-free deionized water, top-tier products, and white-glove service.',
  openGraph: {
    title: 'About Divine Detail | Mobile Detailing Experts | Palm Beach, FL',
    description:
      'Meet Divine Detail, Palm Beach’s premium mobile auto detailing team. Spot-free deionized water, top-tier products, and white-glove service.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
