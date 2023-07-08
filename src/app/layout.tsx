import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/redux/provider';
const inter = Inter({ subsets: ['latin'] });
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TrustAuthX',
  description: 'TrustAuthX'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href="/logo.svg"></link>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
