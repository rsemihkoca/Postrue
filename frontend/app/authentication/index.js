import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableHighlight,
} from "react-native";
import AuthBottom from "../../assets/AuthBottom.js";
import AuthTop from "../../assets/AuthTop.js";
import { getHeight, getWidth } from "../../lib/space.js";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormInput from "../../components/FormInput/FormInput.js";
import PressableInput from "../../components/PressableInput/PressableInput.js";
import { router } from "expo-router";

const AuthenticationFrom = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <AuthTop style={[styles.top, { marginTop: -insets.top - 20 }]} />
      <View style={styles.main}>
        <Text style={styles.text}>Postrue</Text>
        <View style={styles.form}>
          <FormInput placeholder={"Username"} />
          <FormInput
            autoFocus
            secureTextEntry={true}
            placeholder={"Password"}
          />
        </View>
        <PressableInput
          underlayColor={"#000"}
          onPress={() => router.replace("/route")}
          style={{ marginTop: getHeight(42) }}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </PressableInput>
      </View>
      <AuthBottom style={styles.bottom} />
    </View>
  );
};

export default AuthenticationFrom;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    width: "100vw",
    justifyContent: "space-between",
  },
  main: {
    position: "absolute",
    paddingHorizontal: getWidth(32),
    width: "100%",
  },
  form: {
    marginTop: getHeight(46),
    rowGap: getHeight(20),
  },
  text: {
    fontFamily: "Eudoxus-Medium",
    fontSize: 50,
    textAlign: "left",
    color: "#333333",
    marginTop: getHeight(120),
  },

  buttonText: {
    fontFamily: "Eudoxus-Medium",
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
  },

  top: {
    marginLeft: getWidth(207),
    position: "absolute",
  },
  bottom: {
    marginTop: getWidth(450),
    marginLeft: getWidth(-20),
    position: "absolute",
  },
});
