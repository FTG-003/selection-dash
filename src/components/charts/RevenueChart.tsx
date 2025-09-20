'use client';

import { Group, Text, useMantineTheme } from '@mantine/core';
import dynamic from 'next/dynamic';
import { Surface } from '@/components/ui/Surface';
import { ErrorAlert } from '@/components/ui/ErrorAlert';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface RevenueChartProps {
  data: { series: { name: string; data: number[] }[]; categories: string[] } | null;
  loading: boolean;
  error: any;
}

export function RevenueChart({ data, loading, error }: RevenueChartProps) {
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
    chart: { type: 'area' as const },
    xaxis: { categories: data.categories },
    colors: [
      theme.colors.blue[6],
      theme.colors.green[6],
      theme.colors.orange[6],
      theme.colors.red[6],
    ],
    stroke: { curve: 'smooth' as const },
    dataLabels: { enabled: false },
  };

  return (
    <Surface>
      <Group mb="md">
        <Text size="lg" fw={600}>
          Key Metrics Trends
        </Text>
      </Group>
      <Chart
        options={options}
        series={data.series}
        type="area"
        height={350}
      />
    </Surface>
  );
}