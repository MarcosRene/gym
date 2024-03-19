import { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { Button } from '@/components/Button';
import { ScreenHeader } from '@/components/ScreenHeader';
import { UserPhoto } from '@/components/UserPhoto';
import { Input } from '@/components/Input';

const PHOTO_SIZE = 33;

export function Profile() {
  const toast = useToast();
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/MarcosRene.png'
  );

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      const photoInfor = await FileSystem.getInfoAsync(
        photoSelected.assets[0]?.uri
      );

      if (photoInfor.exists && photoInfor.size / 1024 / 1024 > 5) {
        return toast.show({
          title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      setUserPhoto(photoSelected.assets[0]?.uri);
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

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
              source={{ uri: userPhoto }}
              alt="Imagem do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
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
