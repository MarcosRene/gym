import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base';
import { Entypo } from '@expo/vector-icons';

type ExerciseCard = TouchableOpacityProps & {};

export function ExerciseCard({ ...rest }: ExerciseCard) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        mb={3}
        p={2}
        pr={4}
        bg="gray.500"
        rounded="md"
        alignItems="center"
      >
        <Image
          source={{
            uri: 'https://www.origym.com.br/midia/remada-unilateral-3.jpg',
          }}
          alt="Imagem do exercício"
          height={16}
          width={16}
          mr={4}
          rounded="md"
          resizeMode="center"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white">
            Remada unilateral
          </Heading>

          <Text mt={1} fontSize="sm" color="gray.200" numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
