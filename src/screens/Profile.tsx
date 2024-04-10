import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as yup from 'yup';

import { useAuth } from '@/hooks/useAuth';

import { api } from '@/services/api';

import { Button } from '@/components/Button';
import { ScreenHeader } from '@/components/ScreenHeader';
import { UserPhoto } from '@/components/UserPhoto';
import { Input } from '@/components/Input';

import { AppError } from '@/utils/AppError';

import defaultUserPhotoImg from '@/assets/userPhotoDefault.png';

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
};

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos.')
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) =>
        schema
          .nullable()
          .required('Informe a confirmação da senha.')
          .transform((value) => (!!value ? value : null)),
    }),
});

const avatarURL = (avatar: string) =>
  `${api.defaults.baseURL}/avatar/${avatar}`;

export function Profile() {
  const toast = useToast();

  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/MarcosRene.png'
  );

  const { user, updateUserProfile } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) return;

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

      const fileExtension = photoSelected.assets[0]?.uri.split('.').pop();

      const photoFile = {
        name: `${user.name}.${fileExtension}`.replace(' ', '-').toLowerCase(),
        uri: photoSelected.assets[0]?.uri,
        type: `${photoSelected.assets[0]?.type}/${fileExtension}`,
      } as any;

      const userPhotoUploadForm = new FormData();

      userPhotoUploadForm.append('avatar', photoFile);

      const { data: avatarUpdatedResponse } = await api.patch(
        '/users/avatar',
        userPhotoUploadForm,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        }
      );

      const userUpdated = {
        ...user,
        avatar: avatarUpdatedResponse.avatar,
      };

      await updateUserProfile(userUpdated);

      toast.show({
        title: 'Foto atualizada!',
        placement: 'top',
        bgColor: 'green.700',
      });

      setUserPhoto(user?.avatar);
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      await api.put('/users', data);

      await updateUserProfile({ ...user, name: data.name });

      toast.show({
        title: 'Perfil atualizado com sucesso.',
        placement: 'top',
        bgColor: 'green.700',
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsUpdating(false);
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
              source={
                user.avatar
                  ? { uri: avatarURL(user.avatar) }
                  : defaultUserPhotoImg
              }
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

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                bg="gray.600"
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                bg="gray.600"
                isDisabled
              />
            )}
          />

          <Heading
            mt={12}
            mb={2}
            fontSize="md"
            fontFamily="heading"
            color="gray.200"
            alignSelf="flex-start"
          >
            Alterar senhar
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Senha antiga"
                onChangeText={onChange}
                value={value}
                secureTextEntry
                bg="gray.600"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nova senha"
                onChangeText={onChange}
                value={value}
                secureTextEntry
                bg="gray.600"
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Confirme a nova senha"
                onChangeText={onChange}
                value={value}
                secureTextEntry
                bg="gray.600"
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            mt={4}
            title="Atualizar"
            isLoading={isUpdating}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
