import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { router } from "expo-router";

import { getHeight, getWidth } from "../../lib/space";

const Route = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to POSTRUE!</Text>
      <Pressable
        style={styles.box_container}
        onPress={() => router.push("/camera")}
      >
        <Image
          source={require("../../assets/icons/Accessibility.png")}
          style={styles.image}
        />
        <View style={styles.box_content_container}>
          <Text style={styles.box_title}>Check my posture!</Text>
          <Text style={styles.box_desc}>
            Try POSTRUE'S live posture detection.
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.box_container}
        onPress={() => router.push("/details")}
      >
        <Image
          source={require("../../assets/icons/Analytics.png")}
          style={styles.image}
        />
        <View style={styles.box_content_container}>
          <Text style={styles.box_title}>Show my stats!</Text>
          <Text style={styles.box_desc}>
            Try POSTRUE'S posture detection analytics.
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getWidth(16),
  },
  title: {
    fontFamily: "Eudoxus-ExtraBold",
    fontSize: 24,
    marginVertical: getHeight(32),
    color: "#0E0F19",
  },
  box_container: {
    display: "flex",
    flexDirection: "row",
    marginVertical: getHeight(8),
    gap: 8,
    padding: 20,
    minHeight: 160,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#D3F6DB",
  },
  image: {
    width: 32,
    height: 32,
  },
  box_title: {
    fontFamily: "Eudoxus-ExtraBold",
    fontSize: 22,
  },
  box_desc: {
    fontFamily: "Eudoxus-Regular",
    fontSize: 16,
  },
});

export default Route;
