'use client';

import { useEffect, useMemo } from 'react';

import { MantineProvider, MantineThemeOverride } from '@mantine/core';

import {
  COLOR_SCHEMES,
  ThemeCustomizerProvider,
  useThemeCustomizer,
} from '@/contexts/theme-customizer';
import { MainLayout } from '@/layouts/Main';
import { createDynamicTheme } from '@/theme';

type Props = { children: React.ReactNode };

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { config } = useThemeCustomizer();

  const dynamicTheme: MantineThemeOverride = useMemo(() => {
    return createDynamicTheme({
      primaryColor: config.appearance.primaryColor,
      borderRadius: config.appearance.borderRadius,
      compact: config.appearance.compact,
    });
  }, [
    config.appearance.primaryColor,
    config.appearance.borderRadius,
    config.appearance.compact,
  ]);

  useEffect(() => {
    const root = document.documentElement;

    const primaryColor = COLOR_SCHEMES[config.appearance.primaryColor];
    root.style.setProperty('--theme-primary-color', primaryColor.color);

    const radiusMap = {
      xs: '0.125rem',
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
    } as const;
    root.style.setProperty(
      '--theme-border-radius',
      radiusMap[config.appearance.borderRadius],
    );

    const spacingScale = config.appearance.compact ? '0.8' : '1';
    root.style.setProperty('--theme-spacing-scale', spacingScale);

    root.style.setProperty(
      '--theme-compact',
      config.appearance.compact ? '1' : '0',
    );

    root.style.setProperty(
      '--sidebar-width',
      `${config.layout.sidebar.width}px`,
    );
    root.style.setProperty(
      '--header-height',
      `${config.layout.header.height}px`,
    );
  }, [config]);

  return (
    <MantineProvider
      theme={dynamicTheme}
      defaultColorScheme={config.appearance.colorScheme}
    >
      <MainLayout>{children}</MainLayout>
    </MantineProvider>
  );
}

export default function ClientProviders({ children }: Props) {
  return (
    <ThemeCustomizerProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ThemeCustomizerProvider>
  );
}

