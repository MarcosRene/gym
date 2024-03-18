import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import HistorySvg from '@/assets/history.svg';
import HomeSvg from '@/assets/home.svg';
import ProfileSvg from '@/assets/profile.svg';

import { Exercise } from '@/screens/Exercise';
import { History } from '@/screens/History';
import { Home } from '@/screens/Home';
import { Profile } from '@/screens/Profile';

type AppRoutes = {
  exercise: undefined;
  history: undefined;
  home: undefined;
  profile: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

const isAndroid = Platform.OS === 'android';

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#00B37E',
        tabBarInactiveTintColor: '#C4C4CC',
        tabBarStyle: {
          backgroundColor: '#202024',
          borderTopWidth: 0,
          height: isAndroid ? 'auto' : 96,
          paddingBottom: 40,
          paddingTop: 24,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={24} height={24} />
          ),
        }}
      />

      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={24} height={24} />
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={24} height={24} />
          ),
        }}
      />

      <Screen
        name="exercise"
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
