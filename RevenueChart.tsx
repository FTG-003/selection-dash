
'use client';

import React, { useEffect, useState } from 'react';

import {
  Group,
  PaperProps,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import dynamic from 'next/dynamic';

import { Surface } from '@/components';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type RevenueChartProps = PaperProps & {
  data: { series: { name: string; data: number[] }[]; categories: string[] };
  loading: boolean;
  error: any;
};

const RevenueChart = ({ data, loading, error, ...others }: RevenueChartProps) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const CHART_TITLE = 'Andamento delle Metriche Chiave';

  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: 'area' as const,
        fontFamily: 'Open Sans, sans-serif',
        redrawOnParentResize: true,
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
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth' as const,
      },
      xaxis: {
        type: 'datetime' as const,
        categories: [],
        labels: {
          style: {
            colors: colorScheme === 'dark' ? theme.white : theme.black,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: colorScheme === 'dark' ? theme.white : theme.black,
          },
        },
      },
      tooltip: {
        x: {
          format: 'dd/MM/yyyy',
        },
        theme: colorScheme === 'dark' ? 'dark' : 'light',
      },
      colors: [
        theme.colors[theme.primaryColor][5],
        theme.colors[theme.primaryColor][2],
        theme.colors[theme.primaryColor][7],
        theme.colors[theme.primaryColor][4],
      ],
      legend: {
        labels: {
          colors: [
            colorScheme === 'dark' ? theme.white : theme.black,
            colorScheme === 'dark' ? theme.white : theme.black,
            colorScheme === 'dark' ? theme.white : theme.black,
            colorScheme === 'dark' ? theme.white : theme.black,
          ],
        },
      },
    },
  });

  useEffect(() => {
    if (data && data.series && data.categories) {
      setState(prevState => ({
        ...prevState,
        series: data.series,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: data.categories,
          },
        },
      }));
    }
  }, [data, colorScheme, theme]);

  if (loading) return <Text>Caricamento dati...</Text>;
  if (error) return <Text>Errore nel caricamento del grafico: {error.message}</Text>;

  return (
    <Surface {...others}>
      <Group mb="md">
        <Text size="lg" fw={600}>
          {CHART_TITLE}
        </Text>
      </Group>
      <div>
        {/*@ts-ignore*/}
        <ReactApexChart 
          options={state.options} 
          series={state.series} 
          type="area" 
          height={350} 
          width={'100%'}
        />
      </div>
    </Surface>
  );
};

export default RevenueChart;


