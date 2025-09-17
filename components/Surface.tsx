'use client';

import { Paper, PaperProps } from '@mantine/core';

export function Surface(props: PaperProps) {
  return <Paper radius="md" withBorder {...props} />;
}

