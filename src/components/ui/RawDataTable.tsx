'use client';

import { useState, useEffect, useMemo } from 'react';
import { MultiSelect, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Surface } from './Surface';
import { ErrorAlert } from './ErrorAlert';

interface RawDataTableProps {
  data: any[];
  error?: any;
  loading?: boolean;
}

export function RawDataTable({ data, error, loading }: RawDataTableProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [records, setRecords] = useState<any[]>([]);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<any>>({
    columnAccessor: 'Date',
    direction: 'asc',
  });
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [selectedPhases, setSelectedPhases] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const phases = useMemo(() => {
    return Array.from(new Set(data?.map((e) => e.Phase) || []));
  }, [data]);

  const reciprocityTypes = useMemo(() => {
    return Array.from(new Set(data?.map((e) => e.ReciprocityType) || []));
  }, [data]);

  useEffect(() => {
    if (!data) return;
    
    let filtered = data.filter((item) => {
      if (debouncedQuery && !item.Date.toLowerCase().includes(debouncedQuery.toLowerCase())) {
        return false;
      }
      if (selectedPhases.length && !selectedPhases.includes(item.Phase)) {
        return false;
      }
      if (selectedTypes.length && !selectedTypes.includes(item.ReciprocityType)) {
        return false;
      }
      return true;
    });

    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(filtered.slice(from, to));
  }, [data, page, pageSize, debouncedQuery, selectedPhases, selectedTypes]);

  if (error) {
    return <ErrorAlert title="Error loading data" message={error.toString()} />;
  }

  const columns = [
    { accessor: 'Date', title: 'Date', sortable: true },
    { accessor: 'EQI', title: 'EQI', sortable: true, render: (item: any) => item.EQI.toFixed(2) },
    { accessor: 'RC', title: 'RC', sortable: true, render: (item: any) => item.RC.toFixed(2) },
    { accessor: 'CDI', title: 'CDI', sortable: true, render: (item: any) => item.CDI.toFixed(2) },
    { accessor: 'SR', title: 'SR', sortable: true, render: (item: any) => item.SR.toFixed(2) },
    { accessor: 'Phase', title: 'Phase' },
    { accessor: 'ReciprocityType', title: 'Reciprocity Type' },
    { accessor: 'Group', title: 'Group' },
  ];

  return (
    <Surface>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <TextInput
          placeholder="Search by date..."
          leftSection={<IconSearch size={16} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          style={{ minWidth: 200 }}
        />
        <MultiSelect
          placeholder="Filter by phase"
          data={phases}
          value={selectedPhases}
          onChange={setSelectedPhases}
          clearable
          style={{ minWidth: 200 }}
        />
        <MultiSelect
          placeholder="Filter by type"
          data={reciprocityTypes}
          value={selectedTypes}
          onChange={setSelectedTypes}
          clearable
          style={{ minWidth: 200 }}
        />
      </div>
      
      <DataTable
        minHeight={400}
        columns={columns}
        records={records}
        totalRecords={data?.length || 0}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={setPage}
        recordsPerPageOptions={[10, 20, 50]}
        onRecordsPerPageChange={setPageSize}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        fetching={loading}
        striped
        highlightOnHover
      />
    </Surface>
  );
}