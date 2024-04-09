import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';
import { Feather } from '@expo/vector-icons';

import { api } from '@/services/api';

import { Button } from '@/components/Button';

import { AppError } from '@/utils/AppError';

import { AppNavigatorRoutesProps } from '@/routes/app.routes';

import { ExercisesDTO } from '@/dtos/ExercisesDTO';

import BodySvg from '@/assets/body.svg';
import SeriesSvg from '@/assets/series.svg';
import RepetitionsSvg from '@/assets/repetitions.svg';

type RouteParamsProps = {
  exerciseId: string;
};

const DemoURL = (demo: string) => {
  return `${api.defaults.baseURL}/exercise/demo/${demo}`;
};

export function Exercise() {
  const { params } = useRoute();
  const { goBack } = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();

  const [execise, setExercise] = useState<ExercisesDTO>({} as ExercisesDTO);

  const { exerciseId } = params as RouteParamsProps;

  function handleGoBack() {
    goBack();
  }

  async function fetchExerciseDetails() {
    try {
      const { data: dataReponseExercise } = await api.get(
        `/exercises/${exerciseId}`
      );

      setExercise(dataReponseExercise);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1} bg="gray.700">
      <VStack px={8} pt={12} bg="gray.600">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          mt={4}
          mb={8}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading
            fontSize="lg"
            fontFamily="heading"
            color="gray.100"
            flexShrink={1}
          >
            {execise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text ml={1} color="gray.200" textTransform="capitalize">
              {execise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        <VStack p={8}>
          <Box mb={3} rounded="lg" overflow="hidden">
            <Image
              w="full"
              h={80}
              source={{
                uri: DemoURL(execise?.demo),
              }}
              alt="Imagem do exercício"
              resizeMode="cover"
            />
          </Box>

          <Box pb={4} px={4} bg="gray.600" rounded="md">
            <HStack
              mb={6}
              mt={5}
              alignItems="center"
              justifyContent="space-around"
            >
              <HStack>
                <SeriesSvg />
                <Text ml={2} color="gray.200">
                  {execise.series} séries
                </Text>
              </HStack>
              <HStack>
                <RepetitionsSvg />
                <Text ml={2} color="gray.200">
                  {execise.repetitions} repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
