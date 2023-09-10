import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/redux/provider';
const inter = Inter({ subsets: ['latin'] });
import './globals.css';
import { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { ReactQueryProvider } from '@/Providers/react-query-provider';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// import { CrispProvider } from '@/Providers/crisp-provider';

export const metadata: Metadata = {
  title: 'TrustAuthX',
  description: 'TrustAuthX'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      window.gtag('config', 'G-BBZJRC7ER3', {
        page_path: url
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href="/logo.svg"></link>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-BBZJRC7ER3"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-BBZJRC7ER3');
              `
        }}
      />
      <head />
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
