import { Text, View } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [isFontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#202020',
      }}
    >
      <StatusBar style="light" translucent />
      <Text style={{ fontFamily: 'Roboto_700Bold', color: '#FFFFFF' }}>
        Hello World
      </Text>
    </View>
  );
}
