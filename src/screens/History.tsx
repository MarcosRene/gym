import { useState } from 'react';
import { Heading, SectionList, Text, VStack } from 'native-base';

import { HistoryCard } from '@/components/HistoryCard';
import { ScreenHeader } from '@/components/ScreenHeader';

type ExercisesHistoryProps = {
  title: string;
  data: string[];
};

export function History() {
  const [exercises, setExercises] = useState<ExercisesHistoryProps[]>([
    {
      title: '18.03.2024',
      data: ['Puxada frontal', 'Remada unilateral'],
    },
    {
      title: '18.03.2024',
      data: ['Puxada frontal'],
    },
  ]);

  return (
    <VStack flex={1} bg="gray.700">
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading mt={10} mb={3} fontSize="md" color="gray.200">
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercícios registrados ainda. {'\n'}
            Vamos fazer exercícios hoje?
          </Text>
        )}
      />
    </VStack>
  );
}
