import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Your Detail | Contact Divine Detail | Palm Beach, FL',
  description:
    'Book your mobile auto detailing with Divine Detail in Palm Beach. Call 561-467-4866, email info@divinedetail.com, or use our contact form.',
  openGraph: {
    title: 'Book Your Detail | Contact Divine Detail | Palm Beach, FL',
    description:
      'Book your mobile auto detailing with Divine Detail in Palm Beach. Call 561-467-4866, email info@divinedetail.com, or use our contact form.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
