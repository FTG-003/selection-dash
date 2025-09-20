// Note: Root layout is a Server Component by default in Next.js App Router.

import { ColorSchemeScript } from '@mantine/core';
import { Open_Sans } from 'next/font/google';

import ClientProviders from './ClientProviders';
import '@mantine/core/styles.css';
import 'mantine-datatable/styles.layer.css';
import './globals.css';

// If loading a variable font, you don't need to specify the font weight
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <head>
        <title>Pyragogy Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="Explore our versatile dashboard website template featuring a stunning array of themes and meticulously crafted components. Elevate your web project with seamless integration, customizable themes, and a rich variety of components for a dynamic user experience. Effortlessly bring your data to life with our intuitive dashboard template, designed to streamline development and captivate users. Discover endless possibilities in design and functionality today!"
        />
        {process.env.NEXT_PUBLIC_ENABLE_ONESIGNAL === 'true' && (
          <script
            src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
            defer
          ></script>
        )}
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
