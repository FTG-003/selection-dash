'use client';

import { Container, Stack } from '@mantine/core';
import { StatsGrid } from '@/components/ui/StatsGrid';
import { SalesChart } from '@/components/charts/SalesChart';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { MobileDesktopChart } from '@/components/charts/MobileDesktopChart';
import { TextInsightsGrid } from '@/components/ui/TextInsightsGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { useFetchData } from '@/hooks/useFetchData';

export default function DashboardPage() {
  const { data: statsData, loading: statsLoading, error: statsError } = useFetchData('/mocks/StatsGrid.json');
  const { data: salesData, loading: salesLoading, error: salesError } = useFetchData('/mocks/SalesChart.json');
  const { data: revenueData, loading: revenueLoading, error: revenueError } = useFetchData('/mocks/RevenueChart.json');
  const { data: mobileData, loading: mobileLoading, error: mobileError } = useFetchData('/mocks/MobileDesktopChart.json');
  const { data: insightsData, loading: insightsLoading, error: insightsError } = useFetchData('/mocks/TextInsights.json');

  return (
    <Container fluid>
      <Stack gap="lg">
        <PageHeader title="Dashboard Overview" />
        
        <StatsGrid 
          data={statsData?.data} 
          loading={statsLoading} 
          error={statsError} 
        />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>
          <SalesChart 
            data={salesData} 
            loading={salesLoading} 
            error={salesError} 
          />
          <MobileDesktopChart 
            data={mobileData} 
            loading={mobileLoading} 
            error={mobileError} 
          />
        </div>
        
        <RevenueChart 
          data={revenueData} 
          loading={revenueLoading} 
          error={revenueError} 
        />
        
        <TextInsightsGrid 
          data={insightsData} 
          loading={insightsLoading} 
          error={insightsError} 
        />
      </Stack>
    </Container>
  );
}