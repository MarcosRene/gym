import { useCallback, useState } from 'react';
import { Heading, SectionList, Text, VStack, useToast } from 'native-base';

import { HistoryCard } from '@/components/HistoryCard';
import { ScreenHeader } from '@/components/ScreenHeader';

import { HistoryByDayDTO } from '@/dtos/HistoryByDayDTO';
import { api } from '@/services/api';
import { AppError } from '@/utils/AppError';
import { useFocusEffect } from '@react-navigation/native';
import { Loading } from '@/components/Loading';

export function History() {
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const { data: dataResponseHistory } = await api.get('/history');

      setExercises(dataResponseHistory);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1} bg="gray.700">
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard history={item} />}
          renderSectionHeader={({ section }) => (
            <Heading
              mt={10}
              mb={3}
              fontSize="md"
              fontFamily="heading"
              color="gray.200"
            >
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
      )}
    </VStack>
  );
}
