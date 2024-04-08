import { useNavigation } from '@react-navigation/native';
import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

import { AuthNavigatorRoutesProps } from '@/routes/auth.routes';

import LogoSvg from '@/assets/logo.svg';
import backgrounImage from '@/assets/background.png';

type FormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function handleNewAccount() {
    navigate('signUp');
  }

  function handleSignIn({ email, password }: FormData) {
    console.log({ email, password });
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16} bg="gray.700">
        <Image
          source={backgrounImage}
          defaultSource={backgrounImage}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text fontSize="sm" color="gray.100">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading mb={6} fontSize="xl" fontFamily="heading" color="gray.100">
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            rules={{ required: 'Informe ume e-mail' }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: 'Informe a senha' }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                secureTextEntry
              />
            )}
          />

          <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
        </Center>

        <Center mt={24}>
          <Text mb={3} fontSize="sm" fontFamily="body" color="gray.100">
            Ainda não tem acesso
          </Text>

          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
