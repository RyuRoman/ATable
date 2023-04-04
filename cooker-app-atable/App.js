// import dependencies
import React from "react";
import { Platform } from "react-native";
import { SafeAreaView } from "react-navigation";

// import MainNavigatorA or MainNavigatorB to preview design differnces
import MainNavigator from "./src/navigation/MainNavigatorA";

// EXPO FIX: Removing Double StatusBar on Android
if (Platform.OS === 'android') {
  SafeAreaView.setStatusBarHeight(0);
}

// APP
const App = () => <MainNavigator />;

export default App;
