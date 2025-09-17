'use client';

import { Group, Title } from '@mantine/core';

type PageHeaderProps = {
  title: string;
  withActions?: boolean;
  actions?: React.ReactNode;
};

export function PageHeader({ title, withActions = true, actions }: PageHeaderProps) {
  return (
    <Group justify="space-between">
      <Title order={3}>{title}</Title>
      {withActions && actions}
    </Group>
  );
}

