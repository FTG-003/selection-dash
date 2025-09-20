'use client';

import { SimpleGrid, Paper, Text, Group, ThemeIcon } from '@mantine/core';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';

interface StatData {
  title: string;
  value: string;
  diff: string;
}

interface StatsGridProps {
  data?: StatData[];
  loading?: boolean;
  error?: any;
}

export function StatsGrid({ data, loading, error }: StatsGridProps) {
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text c="red">Error loading stats</Text>;
  if (!data) return null;

  const stats = data.map((stat) => {
    const diff = parseFloat(stat.diff);
    const isPositive = diff > 0;
    
    return (
      <Paper key={stat.title} p="md" radius="md" withBorder>
        <Group justify="space-between">
          <div>
            <Text c="dimmed" size="sm" fw={500} tt="uppercase">
              {stat.title}
            </Text>
            <Text fw={700} size="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color={isPositive ? 'teal' : 'red'}
            variant="light"
            size="lg"
            radius="md"
          >
            {isPositive ? <IconTrendingUp size={18} /> : <IconTrendingDown size={18} />}
          </ThemeIcon>
        </Group>
        <Text c={isPositive ? 'teal' : 'red'} size="sm" fw={500} mt="xs">
          {isPositive ? '+' : ''}{stat.diff}%
        </Text>
      </Paper>
    );
  });

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
      {stats}
    </SimpleGrid>
  );
}