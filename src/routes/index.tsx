import { NavigationContainer } from '@react-navigation/native';
import { Box } from 'native-base';

import { useAuth } from '@/hooks/useAuth';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { user } = useAuth();

  console.log({ user });

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer>
        {/* <AppRoutes /> */}
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}
