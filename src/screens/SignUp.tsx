import { useNavigation } from '@react-navigation/native';
import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

import LogoSvg from '@/assets/logo.svg';
import backgrounImage from '@/assets/background.png';

export function SignUp() {
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
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
            Crie sua conta
          </Heading>

          <Input placeholder="Nome" />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input placeholder="Senha" secureTextEntry />

          <Button title="Criar e acessar" />
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={24}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
