'use client';

import { Container, Stack } from '@mantine/core';
import { PageHeader } from '@/components/ui/PageHeader';
import { RawDataTable } from '@/components/ui/RawDataTable';
import { useFetchData } from '@/hooks/useFetchData';

export default function RawDataPage() {
  const { data, error, loading } = useFetchData('/mocks/simulated_data.json');

  return (
    <Container fluid>
      <Stack gap="lg">
        <PageHeader title="Raw Data" />
        <RawDataTable data={data} error={error} loading={loading} />
      </Stack>
    </Container>
  );
}