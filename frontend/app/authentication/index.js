import React from "react";
import { View, Text } from "react-native";
import AuthBottom from "../../assets/AuthBottom.js";
import AuthTop from "../../assets/AuthTop.js";

const AuthenticationFrom = () => {
  return (
    <View>
      <AuthBottom />
      <AuthTop />
      <Text>AuthenticationFrom</Text>
    </View>
  );
};

export default AuthenticationFrom;
