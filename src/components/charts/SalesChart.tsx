'use client';

import { Group, Text, useMantineTheme } from '@mantine/core';
import dynamic from 'next/dynamic';
import { Surface } from '@/components/ui/Surface';
import { ErrorAlert } from '@/components/ui/ErrorAlert';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface SalesChartProps {
  data: { series: number[]; labels: string[] } | null;
  loading: boolean;
  error: any;
}

export function SalesChart({ data, loading, error }: SalesChartProps) {
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
    chart: { type: 'donut' as const },
    labels: data.labels,
    colors: [
      theme.colors.blue[6],
      theme.colors.green[6],
      theme.colors.orange[6],
    ],
    legend: { position: 'bottom' as const },
    dataLabels: { enabled: false },
  };

  return (
    <Surface>
      <Group mb="md">
        <Text size="lg" fw={600}>
          Reciprocity Types Distribution
        </Text>
      </Group>
      <Chart
        options={options}
        series={data.series}
        type="donut"
        height={300}
      />
    </Surface>
  );
}