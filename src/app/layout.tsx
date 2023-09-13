import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/redux/provider';
import './globals.css';
import { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { ReactQueryProvider } from '@/Providers/react-query-provider';
// import { CrispProvider } from '@/Providers/crisp-provider';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

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
      <head>
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-29H7RKEJFW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-29H7RKEJFW');
        `}
        </Script>
      </head>
      <body>
        <ReactQueryProvider>
          {/* <CrispProvider /> */}
          <Providers>{children}</Providers>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
