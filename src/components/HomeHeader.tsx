import { TouchableOpacity } from 'react-native';
import { HStack, Heading, Icon, Text, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import { useAuth } from '@/hooks/useAuth';

import { api } from '@/services/api';

import { UserPhoto } from './UserPhoto';

import defaultUserPhotoImg from '@/assets/userPhotoDefault.png';

const avatarURL = (avatar: string) =>
  `${api.defaults.baseURL}/avatar/${avatar}`;

export function HomeHeader() {
  const { user, signOut } = useAuth();

  return (
    <HStack pt={16} pb={5} px={8} bg="gray.600" alignItems="center">
      <UserPhoto
        source={
          user.avatar ? { uri: avatarURL(user.avatar) } : defaultUserPhotoImg
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

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
