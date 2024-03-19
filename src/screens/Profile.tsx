import { useState } from 'react';
import { Center, ScrollView, Skeleton, Text, VStack } from 'native-base';

import { ScreenHeader } from '@/components/ScreenHeader';
import { UserPhoto } from '@/components/UserPhoto';
import { TouchableOpacity } from 'react-native';

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  return (
    <VStack flex={1} bg="gray.700">
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: 'https://github.com/MarcosRene.png' }}
              alt="Imagem do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity>
            <Text
              mt={4}
              mb={8}
              fontSize="md"
              fontWeight="bold"
              color="green.500"
            >
              Alterar foto
            </Text>
          </TouchableOpacity>
        </Center>
      </ScrollView>
    </VStack>
  );
}
