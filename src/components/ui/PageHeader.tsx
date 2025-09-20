'use client';

import { Group, Text, ActionIcon } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';

interface PageHeaderProps {
  title: string;
  withActions?: boolean;
  onRefresh?: () => void;
}

export function PageHeader({ title, withActions = true, onRefresh }: PageHeaderProps) {
  return (
    <Group justify="space-between" mb="md">
      <Text size="xl" fw={700}>
        {title}
      </Text>
      {withActions && (
        <Group gap="xs">
          <ActionIcon variant="light" onClick={onRefresh}>
            <IconRefresh size={16} />
          </ActionIcon>
        </Group>
      )}
    </Group>
  );
}