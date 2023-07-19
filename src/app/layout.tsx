import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/redux/provider';
const inter = Inter({ subsets: ['latin'] });
import './globals.css';
import { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { ReactQueryProvider } from '@/contexts/ReactQueryProvider';

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
        <ReactQueryProvider>
          <Providers>{children}</Providers>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
