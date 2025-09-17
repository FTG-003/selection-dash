import { IconChartBar, IconTable, IconFileText } from '@tabler/icons-react';

import { PATH_DASHBOARD } from '@/index';

// Sidebar will only show the dashboard.
export const SIDEBAR_LINKS = [
  {
    title: 'Dashboard',
    links: [
      { label: 'Overview', icon: IconChartBar, link: PATH_DASHBOARD.default },
    ],
  },
  {
    title: 'Raw data',
    links: [
      { label: 'Data', icon: IconTable, link: PATH_DASHBOARD.rawData },
    ],
  },
  {
    title: 'Ricerca',
    links: [
      { label: 'Tesi', icon: IconFileText, link: PATH_DASHBOARD.thesis },
    ],
  }
];
