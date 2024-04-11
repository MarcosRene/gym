import AsyncStorage from '@react-native-async-storage/async-storage';

import { authTokenStorage } from '@/storage/storageConfig';

type StorageAuthTokenProps = {
  token: string;
  refresh_token: string;
};

export async function storageAuthTokenSave({
  token,
  refresh_token,
}: StorageAuthTokenProps) {
  await AsyncStorage.setItem(
    authTokenStorage,
    JSON.stringify({ token, refresh_token })
  );
}

export async function storageAuthTokenGet() {
  const response = await AsyncStorage.getItem(authTokenStorage);

  const { token, refresh_token }: StorageAuthTokenProps = response
    ? JSON.parse(response)
    : {};

  return { token, refresh_token };
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(authTokenStorage);
}
