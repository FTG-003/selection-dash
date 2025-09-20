'use client';

import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

interface ErrorAlertProps {
  title: string;
  message: string;
}

export function ErrorAlert({ title, message }: ErrorAlertProps) {
  return (
    <Alert
      icon={<IconAlertCircle size={16} />}
      title={title}
      color="red"
      variant="light"
    >
      {message}
    </Alert>
  );
}