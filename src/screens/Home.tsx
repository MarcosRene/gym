import { useCallback, useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, HStack, Heading, Text, VStack, useToast } from 'native-base';

import { api } from '@/services/api';

import { ExerciseCard } from '@/components/ExerciseCard';
import { Group } from '@/components/Group';
import { HomeHeader } from '@/components/HomeHeader';

import { AppError } from '@/utils/AppError';

import { ExercisesDTO } from '@/dtos/ExercisesDTO';

import { AppNavigatorRoutesProps } from '@/routes/app.routes';
import { Loading } from '@/components/Loading';

export function Home() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();

  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExercisesDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState('costas');
  const [isLoading, setIsLoading] = useState(true);

  function handleOpenExerciseDetails(exerciseId: string) {
    navigate('exercise', { exerciseId });
  }

  async function fetchGroups() {
    try {
      const { data: dataResponseGroups } = await api.get('/groups');

      setGroups(dataResponseGroups);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos musculares.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);

      const { data: dataResponseExercises } = await api.get(
        `/exercises/bygroup/${groupSelected}`
      );

      setExercises(dataResponseExercises);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercícios.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1} bg="gray.700">
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        maxH={10}
        minH={10}
        my={10}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack mb={5} justifyContent="space-between">
            <Heading fontSize="md" fontFamily="heading" color="gray.200">
              Exercícios
            </Heading>

            <Text fontSize="sm" color="gray.200">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => handleOpenExerciseDetails(item.id)}
                exercise={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
              paddingBottom: 20,
            }}
          />
        </VStack>
      )}
    </VStack>
  );
}
