'use client';

import { Group, Text, useMantineTheme } from '@mantine/core';
import dynamic from 'next/dynamic';
import { Surface } from '@/components/ui/Surface';
import { ErrorAlert } from '@/components/ui/ErrorAlert';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface MobileDesktopChartProps {
  data: { series: { name: string; data: number[] }[]; categories: string[] } | null;
  loading: boolean;
  error: any;
}

export function MobileDesktopChart({ data, loading, error }: MobileDesktopChartProps) {
  const theme = useMantineTheme();

  if (loading) {
    return (
      <Surface>
        <Text>Loading chart...</Text>
      </Surface>
    );
  }

  if (error) {
    return (
      <Surface>
        <ErrorAlert title="Chart Error" message={error.toString()} />
      </Surface>
    );
  }

  if (!data || !data.series.length) {
    return (
      <Surface>
        <Text>No data available</Text>
      </Surface>
    );
  }

  const options = {
    chart: { type: 'bar' as const, stacked: true },
    xaxis: { categories: data.categories },
    colors: [
      theme.colors.blue[8],
      theme.colors.blue[4],
      theme.colors.blue[6],
    ],
    plotOptions: {
      bar: { horizontal: false, columnWidth: '50%' },
    },
  };

  return (
    <Surface>
      <Group mb="md">
        <Text size="lg" fw={600}>
          EQI by Phase and Group
        </Text>
      </Group>
      <Chart
        options={options}
        series={data.series}
        type="bar"
        height={350}
      />
    </Surface>
  );
}