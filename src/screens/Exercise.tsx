import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HStack, Heading, Icon, Text, VStack } from 'native-base';
import { Feather } from '@expo/vector-icons';

import { AppNavigatorRoutesProps } from '@/routes/app.routes';

import BodySvg from '@/assets/body.svg';

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
    </VStack>
  );
}
