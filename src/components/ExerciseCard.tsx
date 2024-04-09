import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base';
import { Entypo } from '@expo/vector-icons';

import { api } from '@/services/api';

import { ExercisesDTO } from '@/dtos/ExercisesDTO';

type ExerciseCard = TouchableOpacityProps & {
  exercise: ExercisesDTO;
};

const ThumbURL = (thumb: string) => {
  return `${api.defaults.baseURL}/exercise/thumb/${thumb}`;
};

export function ExerciseCard({ exercise, ...rest }: ExerciseCard) {
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
            uri: ThumbURL(exercise.thumb),
          }}
          alt="Imagem do exercício"
          h={16}
          w={16}
          mr={4}
          rounded="md"
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" fontFamily="heading" color="white">
            {exercise.name}
          </Heading>

          <Text mt={1} fontSize="sm" color="gray.200" numberOfLines={2}>
            {exercise.series} séries x {exercise.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
