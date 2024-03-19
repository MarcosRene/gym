import { useState } from 'react';
import { FlatList, HStack, Heading, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { ExerciseCard } from '@/components/ExerciseCard';
import { Group } from '@/components/Group';
import { HomeHeader } from '@/components/HomeHeader';

import { AppNavigatorRoutesProps } from '@/routes/app.routes';

export function Home() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const [groups, setGroups] = useState<string[]>([
    'costas',
    'ombros',
    'bíceps',
    'tríceps',
  ]);
  const [exercises, setExercises] = useState<string[]>([
    'Pulley articulado',
    'Remada alta',
    'Puxada frontal',
    'Remada curvada',
    'Remada unilateral',
    'levantamento terra',
  ]);
  const [groupSelected, setGroupSelected] = useState('costas');

  function handleOpenExerciseDetails() {
    navigate('exercise');
  }

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

      <VStack flex={1} px={8}>
        <HStack mb={5} justifyContent="space-between">
          <Heading fontSize="md" color="gray.200">
            Exercícios
          </Heading>

          <Text fontSize="sm" color="gray.200">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </VStack>
    </VStack>
  );
}
