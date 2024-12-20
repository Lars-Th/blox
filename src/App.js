import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MenuScreen from './screens/MainMenu';
import GameScreen from './screens/GameScreen';
import NewGameScreen from './screens/NewGameScreen';
import ErrorBoundary from './components/ErrorBoundary';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MenuScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MenuScreen" component={MenuScreen} />
          <Stack.Screen name="GameScreen" component={GameScreen} />
          <Stack.Screen name="NewGameScreen" component={NewGameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default App;