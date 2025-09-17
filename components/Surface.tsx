'use client';

import { Paper, PaperProps } from '@mantine/core';
import React from 'react';

type SurfaceProps = React.PropsWithChildren<PaperProps>;

export function Surface({ children, ...props }: SurfaceProps) {
  return (
    <Paper radius="md" withBorder {...props}>
      {children}
    </Paper>
  );
}

