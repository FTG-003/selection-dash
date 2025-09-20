import { IconChartBar, IconTable, IconFileText } from '@tabler/icons-react';

export const SIDEBAR_LINKS = [
  {
    title: 'Analytics',
    links: [
      { label: 'Dashboard', icon: IconChartBar, link: '/' },
      { label: 'Raw Data', icon: IconTable, link: '/raw-data' },
    ],
  },
  {
    title: 'Research',
    links: [
      { label: 'Thesis', icon: IconFileText, link: '/thesis' },
    ],
  },
];