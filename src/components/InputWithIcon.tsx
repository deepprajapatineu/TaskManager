import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface InputWithIconProps extends TextInputProps {
  iconName: string;
  onIconPress: () => void;
  iconSize?: number;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  iconName,
  value,
  placeholder,
  onChangeText,
  onIconPress,
  iconSize = 24,
  secureTextEntry = false,
  ...props
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        {...props}
      />
      <TouchableOpacity onPress={onIconPress} style={styles.icon}>
        <Icon name={iconName} size={iconSize} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 3,
  },
  input: {
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
});

export default InputWithIcon;
