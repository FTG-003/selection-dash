'use client';

import { Paper, PaperProps } from '@mantine/core';

interface SurfaceProps extends PaperProps {
  children: React.ReactNode;
}

export function Surface({ children, ...props }: SurfaceProps) {
  return (
    <Paper p="md" radius="md" withBorder {...props}>
      {children}
    </Paper>
  );
}