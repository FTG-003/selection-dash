import { createTheme, MantineThemeOverride } from '@mantine/core';

export function createDynamicTheme(opts: {
  primaryColor: string;
  borderRadius: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  compact: boolean;
}) {
  const theme: MantineThemeOverride = {
    primaryColor: opts.primaryColor as any,
    scale: opts.compact ? 0.95 : 1,
    defaultRadius: opts.borderRadius,
  };
  return createTheme(theme);
}

