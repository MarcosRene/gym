import React from 'react';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

import { AuthContextProvider } from '@/contexts/AuthContext';

import { Loading } from '@/components/Loading';

import { Routes } from '@/routes';

import { theme } from '@/theme';

export default function App() {
  const [isFontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <AuthContextProvider>
        <StatusBar style="light" translucent />
        {isFontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
