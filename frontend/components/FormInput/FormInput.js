import { StyleSheet, TextInput } from "react-native";

function FormInput({ style, onChange, ...props }) {
  return (
    <TextInput
      selectionColor="#757575"
      style={styles.container}
      onChangeText={onChange}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 12,
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 24,
    fontFamily: "Eudoxus-Light",
    fontSize: 18,
    color: "#757575",
  },
});

export default FormInput;
