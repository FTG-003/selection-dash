'use client';

import { SimpleGrid, Text, Skeleton } from '@mantine/core';
import { Surface } from './Surface';
import { ErrorAlert } from './ErrorAlert';

interface TextInsight {
  category: string;
  title: string;
  description: string;
}

interface TextInsightsGridProps {
  data?: TextInsight[];
  loading?: boolean;
  error?: any;
}

export function TextInsightsGrid({ data, loading, error }: TextInsightsGridProps) {
  if (error) {
    return <ErrorAlert title="Error loading insights" message={error.toString()} />;
  }

  if (loading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} height={150} />
        ))}
      </SimpleGrid>
    );
  }

  if (!data) return null;

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
      {data.map((insight, index) => (
        <Surface key={index}>
          <Text size="xs" c="dimmed" tt="uppercase" fw={500} mb="xs">
            {insight.category}
          </Text>
          <Text fw={600} mb="xs">
            {insight.title}
          </Text>
          <Text size="sm" c="dimmed">
            {insight.description}
          </Text>
        </Surface>
      ))}
    </SimpleGrid>
  );
}