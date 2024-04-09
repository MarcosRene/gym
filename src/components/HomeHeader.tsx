import { TouchableOpacity } from 'react-native';
import { HStack, Heading, Icon, Text, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import { useAuth } from '@/hooks/useAuth';

import { UserPhoto } from './UserPhoto';

import defaultUserPhotoImg from '@/assets/userPhotoDefault.png';

export function HomeHeader() {
  const { user } = useAuth();

  return (
    <HStack pt={16} pb={5} px={8} bg="gray.600" alignItems="center">
      <UserPhoto
        source={
          user?.avatar
            ? { uri: 'https://github.com/MarcosRene.png' }
            : defaultUserPhotoImg
        }
        alt="Imagem do usuário"
        size={16}
        mr={4}
      />

      <VStack flex={1}>
        <Text fontSize="md" color="gray.100">
          Olá,
        </Text>
        <Heading fontSize="md" fontFamily="heading" color="gray.100">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
