import { useState } from 'react';
import { FlatList, HStack, VStack } from 'native-base';

import { HomeHeader } from '@/components/HomeHeader';
import { Group } from '@/components/Group';

export function Home() {
  const [groups, setGroups] = useState<string[]>([
    'costas',
    'ombros',
    'bíceps',
    'tríceps',
  ]);
  const [groupSelected, setGroupSelected] = useState('costas');

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
        maxHeight={10}
        my={10}
      />
    </VStack>
  );
}
