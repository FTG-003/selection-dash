'use client';

import { AppShell } from '@mantine/core';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      header={{ height: 0 }}
      navbar={{ width: 0, breakpoint: 'xs', collapsed: { mobile: true } }}
      padding="md"
    >
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

