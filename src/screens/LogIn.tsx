import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Animated,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/UseAuth";
import { RootStackParamList } from "../navigation/Types";
import InputWithIcon from "../components/InputWithIcon";
import styles from "./styles/LogInStyles";

const LogIn: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { signIn, loading, error } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
        <Animated.View style={{ opacity }}>
          <Text style={styles.title}>Welcome Back!</Text>

          <InputWithIcon
            iconName="user"
            value={email}
            placeholder="Email Address"
            onChangeText={setEmail}
            iconSize={20}
            secureTextEntry={false}
            onIconPress={undefined}
          />
          <InputWithIcon
            iconName={passwordVisible ? "eye-slash" : "eye"}
            value={password}
            placeholder="Password"
            onChangeText={setPassword}
            onIconPress={togglePasswordVisibility}
            iconSize={20}
            secureTextEntry={!passwordVisible}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#0052cc" />
          ) : (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => signIn(email, password)}
              >
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={styles.buttonTextSecondary}>Sign Up</Text>
              </TouchableOpacity>
            </>
          )}
          {error && <Text style={styles.errorText}>{error}</Text>}
        </Animated.View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LogIn;
