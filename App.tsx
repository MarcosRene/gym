import React from 'react';
import { View } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

import { Loading } from '@/components/Loading';

import { SignUp } from '@/screens/SignUp';

import { theme } from '@/theme';

export default function App() {
  const [isFontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style="light" translucent />
      {isFontsLoaded ? <SignUp /> : <Loading />}
    </NativeBaseProvider>
  );
}
