import React from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  View,
  TextInputProps,
} from "react-native";

interface Props extends TextInputProps {
  icon?: React.ReactNode;
}

const TextInput: React.FC<Props> = ({ icon, ...props }) => {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <RNTextInput
        style={[styles.input, icon ? { paddingLeft: 40 } : {}]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
  },
  icon: {
    position: "absolute",
    left: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#333",
    minHeight: 50,
  },
});

export default TextInput;
