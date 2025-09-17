'use client';

import React, { createContext, useContext, useState } from 'react';

type BorderRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ColorSchemeSetting = 'light' | 'dark' | 'auto';

export const COLOR_SCHEMES: Record<string, { color: string }> = {
  blue: { color: '#228be6' },
  indigo: { color: '#4c6ef5' },
  teal: { color: '#12b886' },
  cyan: { color: '#15aabf' },
  violet: { color: '#7048e8' },
};

export type ThemeCustomizerConfig = {
  appearance: {
    primaryColor: keyof typeof COLOR_SCHEMES;
    borderRadius: BorderRadius;
    compact: boolean;
    colorScheme: ColorSchemeSetting;
  };
  layout: {
    sidebar: { width: number };
    header: { height: number };
  };
};

const defaultConfig: ThemeCustomizerConfig = {
  appearance: {
    primaryColor: 'indigo',
    borderRadius: 'md',
    compact: false,
    colorScheme: 'auto',
  },
  layout: {
    sidebar: { width: 260 },
    header: { height: 56 },
  },
};

const ThemeCustomizerContext = createContext<{ config: ThemeCustomizerConfig; setConfig: (c: ThemeCustomizerConfig) => void }>({
  config: defaultConfig,
  setConfig: () => {},
});

export function ThemeCustomizerProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ThemeCustomizerConfig>(defaultConfig);
  return (
    <ThemeCustomizerContext.Provider value={{ config, setConfig }}>
      {children}
    </ThemeCustomizerContext.Provider>
  );
}

export function useThemeCustomizer() {
  return useContext(ThemeCustomizerContext);
}

