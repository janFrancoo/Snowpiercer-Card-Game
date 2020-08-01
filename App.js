import 'react-native-gesture-handler';
import React from 'react';
import GameLoadingView from "./screens/GameLoadingView";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GameLoadingView" component={GameLoadingView} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
