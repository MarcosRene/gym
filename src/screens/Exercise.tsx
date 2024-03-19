import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Heading, Icon, Image, Text, VStack } from 'native-base';
import { Feather } from '@expo/vector-icons';

import { Button } from '@/components/Button';

import { AppNavigatorRoutesProps } from '@/routes/app.routes';

import BodySvg from '@/assets/body.svg';
import SeriesSvg from '@/assets/series.svg';
import RepetitionsSvg from '@/assets/repetitions.svg';

export function Exercise() {
  const { goBack } = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    goBack();
  }

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
          <Heading fontSize="lg" color="gray.100" flexShrink={1}>
            Puxada frontal
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text ml={1} color="gray.200" textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack p={8}>
        <Image
          w="full"
          h={80}
          mb={3}
          source={{
            uri: 'https://pratiquefitness.com.br/blog/wp-content/uploads/2023/07/Exercicio-puxada-beneficios-variacoes-e-como-fazer-2.jpg',
          }}
          alt="Imagem do exercício"
          resizeMode="cover"
          rounded="lg"
        />

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
                3 séries
              </Text>
            </HStack>
            <HStack>
              <RepetitionsSvg />
              <Text ml={2} color="gray.200">
                12 repetições
              </Text>
            </HStack>
          </HStack>

          <Button title="Marcar como realizado" />
        </Box>
      </VStack>
    </VStack>
  );
}
