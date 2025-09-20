'use client';

import { Container, Stack, Text, Button, Paper, Group, List, ThemeIcon } from '@mantine/core';
import { IconDownload, IconFileText, IconCheck } from '@tabler/icons-react';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ThesisPage() {
  return (
    <Container fluid>
      <Stack gap="lg">
        <PageHeader title="Research Thesis" />
        
        <Paper p="xl" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between" align="flex-start">
              <div>
                <Text size="xl" fw={700} mb="xs">
                  Cognitive Intraspecific Selection in Education
                </Text>
                <Text size="lg" c="dimmed" mb="md">
                  From Individualism to Collective Strength
                </Text>
                <Text size="sm" c="dimmed">
                  Author: Fabrizio Terzi • ORCID: 0009-0004-7191-0455 • Organization: Pyragogy.org
                </Text>
              </div>
              <Button 
                leftSection={<IconDownload size={16} />}
                variant="filled"
                size="md"
                component="a"
                href="/Cognitive_Intraspecific_Selection_EN..pdf"
                download
              >
                Download PDF
              </Button>
            </Group>
            
            <Text>
              This study introduces the paradigm of Cognitive Intraspecific Selection, systematically 
              transposing the biological concept of intraspecific selection to education. The model 
              promotes constructive confrontation of ideas without penalizing individuals through 
              Pyragogy (evolutionary peer-to-peer pedagogy).
            </Text>
            
            <Text fw={600} size="lg" mt="md">Key Contributions:</Text>
            <List
              spacing="xs"
              size="sm"
              icon={
                <ThemeIcon color="blue" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>Epistemic Quality Index (EQI) for measuring idea quality</List.Item>
              <List.Item>Reciprocation Coefficient (RC) for collaborative exchange</List.Item>
              <List.Item>Cognitive Diversity Index (CDI) for perspective measurement</List.Item>
              <List.Item>System Resilience (SR) for adaptive capacity assessment</List.Item>
              <List.Item>AI-facilitated evolutionary pedagogy framework</List.Item>
            </List>
            
            <Group mt="lg">
              <Text size="sm" c="dimmed">
                <IconFileText size={16} style={{ display: 'inline', marginRight: 4 }} />
                Academic Year: 2025-2026 • Status: PREPRINT • DOI: 10.5281/zenodo.16961291
              </Text>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}