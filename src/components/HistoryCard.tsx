import { HStack, Heading, Text, VStack } from 'native-base';

export function HistoryCard() {
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
      <VStack mr={5}>
        <Heading fontSize="sm" textTransform="capitalize" color="white">
          Costas
        </Heading>

        <Text fontSize="lg" color="gray.100" numberOfLines={1}>
          Puxada frontal
        </Text>
      </VStack>

      <Text fontSize="md" color="gray.300">
        08:56
      </Text>
    </HStack>
  );
}
