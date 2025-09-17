
'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';

import {
  Avatar,
  Badge,
  Flex,
  HoverCard,
  MantineColor,
  MultiSelect,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconCloudDownload, IconEye, IconSearch } from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';
import {
  DataTable,
  DataTableProps,
  DataTableSortStatus,
} from 'mantine-datatable';

import { ErrorAlert, Surface } from '@/components';

const PAGE_SIZES = [10, 20, 50, 100];

const ICON_SIZE = 18;

type RawDataTableProps = {
  data: any[];
  error?: ReactNode;
  loading?: boolean;
};

const RawDataTable = ({ data, error, loading }: RawDataTableProps) => {
  const theme = useMantineTheme();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]); // Default to 20 for raw data
  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>(data?.slice(0, pageSize) || []);
  const [totalRecordsCount, setTotalRecordsCount] = useState<number>(data?.length || 0);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<any>>({
    columnAccessor: 'Date',
    direction: 'asc',
  });
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [selectedPhases, setSelectedPhases] = useState<string[]>([]);
  const [selectedReciprocityTypes, setSelectedReciprocityTypes] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const phases = useMemo(() => {
    const p = new Set(data?.map((e) => e.Phase) || []);
    return Array.from(p);
  }, [data]);

  const reciprocityTypes = useMemo(() => {
    const rt = new Set(data?.map((e) => e.ReciprocityType) || []);
    return Array.from(rt);
  }, [data]);

  const groups = useMemo(() => {
    const g = new Set(data?.map((e) => e.Group) || []);
    return Array.from(g);
  }, [data]);

  const columns: DataTableProps<any>['columns'] = [
    {
      accessor: 'Date',
      title: 'Data',
      sortable: true,
    },
    {
      accessor: 'EQI',
      title: 'EQI',
      sortable: true,
      render: (item: any) => <Text>{item.EQI.toFixed(2)}</Text>,
    },
    {
      accessor: 'RC',
      title: 'RC',
      sortable: true,
      render: (item: any) => <Text>{item.RC.toFixed(2)}</Text>,
    },
    {
      accessor: 'CDI',
      title: 'CDI',
      sortable: true,
      render: (item: any) => <Text>{item.CDI.toFixed(2)}</Text>,
    },
    {
      accessor: 'SR',
      title: 'SR',
      sortable: true,
      render: (item: any) => <Text>{item.SR.toFixed(2)}</Text>,
    },
    {
      accessor: 'Phase',
      title: 'Fase',
      filter: (
        <MultiSelect
          label="Fase"
          description="Filtra per fase sperimentale"
          data={phases}
          value={selectedPhases}
          placeholder="Seleziona fase…"
          onChange={setSelectedPhases}
          leftSection={<IconSearch size={16} />}
          clearable
          searchable
        />
      ),
      filtering: selectedPhases.length > 0,
    },
    {
      accessor: 'ReciprocityType',
      title: 'Tipo di Reciprocità',
      filter: (
        <MultiSelect
          label="Tipo di Reciprocità"
          description="Filtra per tipo di reciprocità"
          data={reciprocityTypes}
          value={selectedReciprocityTypes}
          placeholder="Seleziona tipo…"
          onChange={setSelectedReciprocityTypes}
          leftSection={<IconSearch size={16} />}
          clearable
          searchable
        />
      ),
      filtering: selectedReciprocityTypes.length > 0,
    },
    {
      accessor: 'Group',
      title: 'Gruppo',
      filter: (
        <MultiSelect
          label="Gruppo"
          description="Filtra per gruppo"
          data={groups}
          value={selectedGroups}
          placeholder="Seleziona gruppo…"
          onChange={setSelectedGroups}
          leftSection={<IconSearch size={16} />}
          clearable
          searchable
        />
      ),
      filtering: selectedGroups.length > 0,
    },
  ];

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    const source = (data || []) as any[];
    const sorted = sortBy(source, sortStatus.columnAccessor) as any[];
    const sortedWithDirection = sortStatus.direction === 'desc' ? [...sorted].reverse() : sorted;

    const hasAnyFilter = Boolean(
      debouncedQuery || selectedPhases.length || selectedReciprocityTypes.length || selectedGroups.length,
    );

    const passesFilters = ({ Date, Phase, ReciprocityType, Group }: any) => {
      if (
        debouncedQuery !== '' &&
        !Date.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
      ) {
        return false;
      }

      if (selectedPhases.length && !selectedPhases.some((s) => s === Phase)) {
        return false;
      }

      if (
        selectedReciprocityTypes.length &&
        !selectedReciprocityTypes.some((s) => s === ReciprocityType)
      ) {
        return false;
      }

      if (selectedGroups.length && !selectedGroups.some((s) => s === Group)) {
        return false;
      }

      return true;
    };

    const filteredAll = hasAnyFilter
      ? sortedWithDirection.filter(passesFilters)
      : sortedWithDirection;

    setTotalRecordsCount(filteredAll.length);
    setRecords(filteredAll.slice(from, to));
  }, [sortStatus, data, page, pageSize, debouncedQuery, selectedPhases, selectedReciprocityTypes, selectedGroups]);

  return error ? (
    <ErrorAlert title="Errore nel caricamento dei dati" message={error.toString()} />
  ) : (
    <Surface p="md" style={{ overflow: 'hidden' }}>
      <DataTable
        minHeight="calc(100vh - 250px)"
        verticalSpacing="sm"
        striped
        highlightOnHover
        // @ts-ignore
        columns={columns}
        records={records}
        selectedRecords={selectedRecords}
        // @ts-ignore
        onSelectedRecordsChange={setSelectedRecords}
        totalRecords={totalRecordsCount}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={(p) => setPage(p)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
        sortStatus={sortStatus}
        onSortStatusChange={(s) => setSortStatus(s)}
        fetching={loading}
        style={{ 
          height: 'calc(100vh - 250px)',
          borderRadius: 'var(--theme-border-radius)'
        }}
      />
    </Surface>
  );
};

export default RawDataTable;


