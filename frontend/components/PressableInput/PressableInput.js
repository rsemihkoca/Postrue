import { Pressable, StyleSheet } from "react-native";

function PressableInput({style, onPress, children, ...props }) {
  return (
    <Pressable
      style={[styles.container, style
      ]}
      onPress={onPress}
      {...props}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 7,
    backgroundColor: "#333333",
    fontFamily: "Eudoxus-Light",
    justifyContent: "center",
    fontSize: 18,
    width: "100%",
    color: "#fff",
  },
});

export default PressableInput;
