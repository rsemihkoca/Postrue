import { Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import HomeBottomImage from "../assets/firstPageBottom.png";
import { getWidth, getHeight } from "../lib/space";
import Vector from "../assets/Vector3.js";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FormInput } from "../components";
import { Link } from "expo-router";

export default function Page() {
  const insets = useSafeAreaInsets();
  return (
    <View styles={styles.container}>
      <Vector style={[styles.rightTopImg, { marginTop: -insets.top }]} />
      <Text style={styles.text}>Postrue</Text>
      <Link href="/authentication">
        <Text style={styles.paragraph}>Lorem ipsum dolor sit amet</Text>
      </Link>
      <Image style={styles.image} source={HomeBottomImage} />
      <FormInput />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: "#000",
    flex: 1,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#0000FF",
  },

  image: {
    marginTop: getHeight(220),
    position: "absolute",
  },

  text: {
    fontFamily: "Eudoxus-Medium",
    fontSize: 50,
    marginTop: getHeight(120),
    marginHorizontal: getWidth(40),
  },

  rightTopImg: {
    marginLeft: getWidth(180),
    position: "absolute",
  },

  paragraph: {
    marginLeft: getWidth(168),
    marginRight: getWidth(37),
    marginTop: getHeight(52),
    fontFamily: "Eudoxus-Light",
    fontSize: 18,
    textAlign: "right",
  },
});
