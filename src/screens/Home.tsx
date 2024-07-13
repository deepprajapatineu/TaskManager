import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/UseAuth";
import { InsideStackParamList } from "../navigation/Types";
import { NavigationProp } from "@react-navigation/core";
import styles from "./styles/HomeStyle";

const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProp<InsideStackParamList>>();
  const { signOut } = useAuth();

  // Navigation handlers
  const openTasks = () => navigation.navigate("Task");
  const openLeaderboard = () => navigation.navigate("Leaderboard");
  const handleSignOut = () => {
    if (signOut) {
      signOut();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Task Manager!</Text>
      <TouchableOpacity style={styles.button} onPress={openTasks}>
        <Text style={styles.buttonText}>Open Tasks</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={openLeaderboard}>
        <Text style={styles.buttonText}>Leaderboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSecondary} onPress={handleSignOut}>
        <Text style={styles.buttonTextSecondary}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
