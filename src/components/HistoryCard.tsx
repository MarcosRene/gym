import { HStack, Heading, Text, VStack } from 'native-base';

import { HistoryDTO } from '@/dtos/HistoryDTO';

type HistoryCardProps = {
  history: HistoryDTO;
};

export function HistoryCard({ history }: HistoryCardProps) {
  return (
    <HStack
      w="full"
      mb={3}
      px={5}
      py={4}
      bg="gray.600"
      rounded="md"
      justifyContent="space-between"
      alignItems="center"
    >
      <VStack mr={5} flex={1}>
        <Heading
          fontSize="sm"
          fontFamily="heading"
          textTransform="capitalize"
          color="white"
          numberOfLines={1}
        >
          {history.group}
        </Heading>

        <Text fontSize="lg" color="gray.100" numberOfLines={1}>
          {history.name}
        </Text>
      </VStack>

      <Text fontSize="md" color="gray.300">
        {history.hour}
      </Text>
    </HStack>
  );
}
