import { Pressable, StyleSheet, TouchableHighlight } from "react-native";

function PressableInput({ style, onPress, children, underlayColor, ...props }) {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor={underlayColor}
      onPress={onPress}
      style={[styles.container, style
      ]}
      {...props}
    >
      {children}
    </TouchableHighlight>
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
