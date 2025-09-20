'use client';

import { Group, Text, UnstyledButton } from '@mantine/core';
import Link from 'next/link';

interface LogoProps {
  showText?: boolean;
}

export function Logo({ showText = true }: LogoProps) {
  return (
    <UnstyledButton component={Link} href="/">
      <Group gap="xs">
        <div
          style={{
            width: showText ? 32 : 24,
            height: showText ? 32 : 24,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #228be6, #339af0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: showText ? 16 : 12,
          }}
        >
          P
        </div>
        {showText && <Text fw={700}>Pyragogy</Text>}
      </Group>
    </UnstyledButton>
  );
}