import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from '../screens/MainMenu';
import GameScreen from '../screens/GameScreen';
import GameOverScreen from '../screens/GameOverScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="MainMenu" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainMenu" component={MainMenu} />
      <Stack.Screen name="GameScreen" component={GameScreen} />
      <Stack.Screen name="GameOverScreen" component={GameOverScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;