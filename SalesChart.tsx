'use client';

import React from 'react';

import {
  Group,
  PaperProps,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import dynamic from 'next/dynamic';

import { ErrorAlert, Surface } from '@/components';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type SalesChartProps = PaperProps & {
  data: { series: number[]; labels: string[] } | null;
  loading: boolean;
  error: any;
};

const SalesChart = ({ data, loading, error, ...others }: SalesChartProps) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  
  const CHART_TITLE = 'Distribuzione Tipi di Reciprocità';
  
  const series = data?.series || [];
  const labels = data?.labels || [];

  const options: any = {
    chart: { 
      type: 'donut' as const, 
      fontFamily: 'Open Sans, sans-serif',
      redrawOnParentResize: true,
      redrawOnWindowResize: true,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 400,
        animateGradually: {
          enabled: true,
          delay: 50
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
    },
    legend: { 
      show: true, 
      position: 'bottom',
      labels: {
        colors: colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
      }
    },
    dataLabels: { enabled: false },
    tooltip: { 
      enabled: true,
      theme: colorScheme === 'dark' ? 'dark' : 'light',
    },
    states: {
      hover: { filter: { type: 'lighten', value: 0.5 } },
      active: { filter: { type: 'none', value: 0 } },
    },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '12px',
              fontWeight: '400',
              color: colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
            },
            value: {
              show: true,
              fontSize: '22px',
              fontWeight: '600',
              color: colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Totale',
              formatter: function (w: any) {
                const totals = w.globals.seriesTotals;
                const result = totals.reduce((a: number, b: number) => a + b, 0);
                return result.toString();
              },
              color: colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
            },
          },
        },
      },
    },
    labels: labels,
    colors: [
      theme.colors[theme.primaryColor][5],
      theme.colors[theme.primaryColor][2],
      theme.colors[theme.primaryColor][7],
      theme.colors[theme.primaryColor][4],
    ],
  };

  if (loading) {
    return (
      <Surface {...others}>
        <Group mb="md">
          <Text size="lg" fw={600}>
            {CHART_TITLE}
          </Text>
        </Group>
        <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text size="sm" c="dimmed">Caricamento dati...</Text>
        </div>
      </Surface>
    );
  }

  if (error) {
    return (
      <Surface {...others}>
        <Group mb="md">
          <Text size="lg" fw={600}>
            {CHART_TITLE}
          </Text>
        </Group>
        <ErrorAlert
          title="Errore nel caricamento del grafico"
          message={error.toString()}
        />
      </Surface>
    );
  }

  return (
    <Surface {...others}>
      <Group mb="md">
        <Text size="lg" fw={600}>
          {CHART_TITLE}
        </Text>
      </Group>
      {series.length > 0 && series.some(val => val > 0) ? (
        <>
          {/*@ts-ignore*/}
          <Chart
            key={`chart-${series.join('-')}`}
            options={options}
            series={series}
            type="donut"
            height={200}
            width={'100%'}
          />
        </>
      ) : (
        <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text size="sm" c="dimmed">Nessun dato disponibile per i tipi di reciprocità</Text>
        </div>
      )}
    </Surface>
  );
};

export default SalesChart;

