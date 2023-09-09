import { useCallback } from "react";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Eudoxus-Black": require("../assets/fonts/EudoxusSans-Bold.ttf"),
    "Eudoxus-ExtraBold": require("../assets/fonts/EudoxusSans-ExtraBold.ttf"),
    "Eudoxus-ExtraLight": require("../assets/fonts/EudoxusSans-ExtraLight.ttf"),
    "Eudoxus-Light": require("../assets/fonts/EudoxusSans-Light.ttf"),
    "Eudoxus-Medium": require("../assets/fonts/EudoxusSans-Medium.ttf"),
    "Eudoxus-Regular": require("../assets/fonts/EudoxusSans-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={{ fontFamily: "Eudoxus-Regular" }}>
      <Slot name="root" onLayout={onLayoutRootView} />
    </SafeAreaView>
  );
}
