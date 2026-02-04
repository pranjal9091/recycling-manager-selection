import { useEffect, useState } from 'react';
import { Container, Title, Table, Card, Text, Badge, Group, Grid, RingProgress, Center, Loader, Paper, Stack } from '@mantine/core';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/api/leaderboard')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Center h="100vh"><Loader size="xl" color="green" /></Center>;

  // Data for Heatmap/BarChart (Top 10 Candidates)
  const chartData = data.slice(0, 10).map(c => ({
    name: c.name.split(' ')[0],
    score: Number(c.score).toFixed(1)
  }));

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Center>
            <Stack align="center" gap={0}>
                <Title order={1} c="green.4">♻️ G CP: Production Manager Selection</Title>
                <Text c="dimmed">AI-Powered Candidate Ranking System</Text>
            </Stack>
        </Center>

        {/* SECTION 1: SKILL VISUALIZATION (HEATMAP ALTERNATIVE) */}
        <Paper withBorder p="md" radius="md" shadow="xs">
          <Title order={3} mb="lg">Top 10 Candidate Performance Heatmap</Title>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="score" fill="#40C057" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index < 3 ? '#FAB005' : '#40C057'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Paper>

        {/* SECTION 2: TOP 3 CANDIDATE CARDS */}
        <Title order={3}>🏆 Selection Spotlight</Title>
        <Grid>
          {data.slice(0, 3).map((candidate, index) => (
            <Grid.Col key={candidate.id} span={{ base: 12, md: 4 }}>
              <Card shadow="md" padding="xl" radius="md" withBorder style={{ borderTop: `4px solid ${index === 0 ? '#FAB005' : '#40C057'}` }}>
                <Badge variant="filled" color={index === 0 ? "yellow" : "green"} mb="sm">
                    {index === 0 ? "Best Match" : `Rank #${index + 1}`}
                </Badge>
                <Text size="xl" fw={700}>{candidate.name}</Text>
                <Text size="sm" c="dimmed" h={40}>{candidate.skills}</Text>
                
                <Group justify="center" my="md">
                  <RingProgress
                    size={120}
                    thickness={12}
                    sections={[{ value: (candidate.score || 0) * 10, color: index === 0 ? 'yellow' : 'green' }]}
                    label={<Text size="md" ta="center" fw={700}>{Number(candidate.score || 0).toFixed(1)}</Text>}
                  />
                </Group>
                
                <Stack gap="xs">
                    <Group justify="space-between"><Text size="xs">Sustainability</Text><Text size="xs" fw={700}>{Number(candidate.sustainability).toFixed(1)}</Text></Group>
                    <Group justify="space-between"><Text size="xs">Crisis Management</Text><Text size="xs" fw={700}>{Number(candidate.crisis).toFixed(1)}</Text></Group>
                    <Group justify="space-between"><Text size="xs">Team Motivation</Text><Text size="xs" fw={700}>{Number(candidate.motivation).toFixed(1)}</Text></Group>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* SECTION 3: FULL RANKING TABLE */}
        <Paper withBorder radius="md">
            <Title order={4} p="md">All Candidates (Sample Size: 40)</Title>
            <Table striped highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Experience</Table.Th>
                <Table.Th>Avg. AI Score</Table.Th>
                <Table.Th>Status</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {data.map((c) => (
                <Table.Tr key={c.id}>
                    <Table.Td fw={500}>{c.name}</Table.Td>
                    <Table.Td>{c.experience_years} Years</Table.Td>
                    <Table.Td><Text fw={700} c="green">{Number(c.score || 0).toFixed(2)}</Text></Table.Td>
                    <Table.Td>
                        <Badge variant="dot" color={c.score > 8 ? "green" : "gray"}>
                            {c.score > 8 ? "Shortlisted" : "Reviewed"}
                        </Badge>
                    </Table.Td>
                </Table.Tr>
                ))}
            </Table.Tbody>
            </Table>
        </Paper>
      </Stack>
    </Container>
  );
}