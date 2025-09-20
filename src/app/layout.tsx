'use client';

import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { Open_Sans } from 'next/font/google';

import { MainLayout } from '@/components/layout/MainLayout';
import { theme } from '@/lib/theme';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-datatable/styles.layer.css';
import '@/styles/globals.css';

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
        <title>Pyragogy Analytics Dashboard</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Analytics dashboard for Pyragogy research data" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <DatesProvider settings={{ firstDayOfWeek: 0, weekendDays: [0] }}>
            <Notifications position="bottom-right" zIndex={1000} />
            <ModalsProvider>
              <MainLayout>{children}</MainLayout>
            </ModalsProvider>
          </DatesProvider>
        </MantineProvider>
      </body>
    </html>
  );
}