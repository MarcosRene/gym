import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base';

import { Button } from '@/components/Button';
import { ScreenHeader } from '@/components/ScreenHeader';
import { UserPhoto } from '@/components/UserPhoto';
import { Input } from '@/components/Input';

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  return (
    <VStack flex={1} bg="gray.700">
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
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

          <Input placeholder="Nome" bg="gray.600" />
          <Input placeholder="E-mail" bg="gray.600" isDisabled />

          <Heading
            mt={12}
            mb={2}
            fontSize="md"
            color="gray.200"
            alignSelf="flex-start"
          >
            Alterar senhar
          </Heading>

          <Input placeholder="Senha antiga" secureTextEntry bg="gray.600" />

          <Input placeholder="Nova senha" secureTextEntry bg="gray.600" />

          <Input
            placeholder="Confirme a nova senha"
            secureTextEntry
            bg="gray.600"
          />

          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  );
}
