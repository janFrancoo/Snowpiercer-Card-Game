import "react-native-gesture-handler";
import React, { useRef } from "react";
import GameLoadingView from "./screens/GameLoadingView";
import CardGameView from "./screens/CardGameView";
import PeopleView from "./screens/PeopleView";
import PersonDetailView from "./screens/PersonDetailView"
import SettingsView from "./screens/SettingsView";
import GameOverView from "./screens/GameOverView";
import AboutView from "./screens/AboutView";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StateProvider } from "./helpers/StateProvider"
import { Audio } from "expo-av"

export default function App() {

  const backgroundMusic = useRef(new Audio.Sound()).current

  const initialState = {
    language: 'en',
    music: backgroundMusic,
    musicStatus: true,
    volume: true,
    days: 0
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeLang':
        return {
          ...state,
          language: action.newLanguage
        };
      case 'changeMusicStatus':
        return {
          ...state,
          musicStatus: action.newMusicStatus
        };
      case 'changeVolumeStatus':
        return {
          ...state,
          volume: action.newVolumeStatus
        };
      case 'changeDays':
        return {
          ...state,
          days: action.newDays
        }
      default:
        return state;
    }
  };
  
  const Stack = createStackNavigator();

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
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
          <Stack.Screen name="AboutView" component={AboutView} />
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
}
