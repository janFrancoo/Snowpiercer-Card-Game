import "react-native-gesture-handler";
import React from "react";
import GameLoadingView from "./screens/GameLoadingView";
import CardGameView from "./screens/CardGameView";
import PeopleView from "./screens/PeopleView";
import PersonDetailView from "./screens/PersonDetailView"
import SettingsView from "./screens/SettingsView";
import GameOverView from "./screens/GameOverView";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: "clamp",
              }),
            },
          }),
        }}
        mode="modal">
        <Stack.Screen name="GameLoadingView" component={GameLoadingView} />
        <Stack.Screen name="CardGameView" component={CardGameView} />
        <Stack.Screen name="PeopleView" component={PeopleView} />
        <Stack.Screen name="PersonDetailView" component={PersonDetailView} />
        <Stack.Screen name="SettingsView" component={SettingsView} />
        <Stack.Screen name="GameOverView" component={GameOverView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
