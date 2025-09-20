'use client';

import { AppShell, Burger, Group, Text, NavLink, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { SIDEBAR_LINKS } from '@/data/sidebar-links';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

  const navItems = SIDEBAR_LINKS.map((section) => (
    <div key={section.title}>
      <Text size="xs" fw={500} c="dimmed" tt="uppercase" mb="xs" pl="md">
        {section.title}
      </Text>
      {section.links.map((link) => (
        <NavLink
          key={link.link}
          component={Link}
          href={link.link}
          label={link.label}
          leftSection={<link.icon size={16} />}
          active={pathname === link.link}
          mb={4}
        />
      ))}
    </div>
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Logo />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ScrollArea>
          {navItems}
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}