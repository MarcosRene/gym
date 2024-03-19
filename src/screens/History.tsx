import { VStack } from 'native-base';

import { ScreenHeader } from '@/components/ScreenHeader';

export function History() {
  return (
    <VStack flex={1} bg="gray.700">
      <ScreenHeader title="Histórico de Exercícios" />
    </VStack>
  );
}
