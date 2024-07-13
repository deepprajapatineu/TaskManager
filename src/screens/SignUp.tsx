import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Pressable,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../config/Firebase";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { useAuth } from "../hooks/UseAuth";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles/SignUpStyles";

const Signup: React.FC = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation<NavigationProp<any>>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleSignOut = () => {
    if (signOut) {
      signOut();
    }
  };

  const validatePassword = (password: string): boolean => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      password.length < minLength ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumbers ||
      !hasSpecialChar
    ) {
      Alert.alert(
        "Password Requirement",
        "Password must be at least 6 characters long and include uppercase letters, lowercase letters, numbers, and special characters."
      );
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;
      if (user) {
        await sendEmailVerification(user);
        await setDoc(doc(FIREBASE_DB, "Users", user.uid), {
          firstName,
          lastName,
          email,
          emailVerified: false,
        });
        Alert.alert(
          "Verify Email",
          "A verification email has been sent. Please check your email."
        );
        handleSignOut();
        navigation.navigate("LogIn");
      }
    } catch (error: any) {
      const message = signUpError(error.code);
      setError(message);
      Alert.alert("Signup Error", message);
    } finally {
      setLoading(false);
    }
  };

  const signUpError = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "The email address is badly formatted.";
      case "auth/email-already-in-use":
        return "This email is already in use.";
      case "auth/weak-password":
        return "Password should be at least 8 characters.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.passwordInput}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.infoIcon}
          >
            <Icon name="info" size={24} color="#0052cc" />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          style={styles.input}
          autoCapitalize="none"
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0052cc" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
        {error && <Text style={styles.error}>{error}</Text>}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {" "}
              Password must be at least 6 characters long and include uppercase
              letters, lowercase letters, numbers, and special characters.
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Got it</Text>
            </Pressable>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
