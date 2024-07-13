import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../config/Firebase";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../styles/LeaderboardStyle";

type UserTaskCount = {
  name: string;
  tasksCompleted: number;
};

type LeaderboardEntry = UserTaskCount & { userId: string };

const windowWidth = Dimensions.get("window").width;

const LeaderboardScreen: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("daily");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useFocusEffect(
    React.useCallback(() => {
      const loadLeaderboardData = async () => {
        setIsLoading(true);
        setError("");
        try {
          const now = new Date();
          let startDate: Date;
          switch (selectedTimeframe) {
            case "daily":
              startDate = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
              );
              break;
            case "weekly":
              startDate = new Date(now.setDate(now.getDate() - now.getDay()));
              break;
            case "monthly":
              startDate = new Date(now.getFullYear(), now.getMonth(), 1);
              break;
            default:
              startDate = new Date();
              break;
          }

          const tasksRef = collection(FIREBASE_DB, "Tasks");
          const q = query(
            tasksRef,
            where("completedAt", ">=", startDate),
            orderBy("completedAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          const userTasks: { [key: string]: number } = {};
          querySnapshot.forEach((doc) => {
            const task = doc.data();
            userTasks[task.userId] = (userTasks[task.userId] || 0) + 1;
          });

          const userNames: { [key: string]: string } = {};
          await Promise.all(
            Object.keys(userTasks).map(async (userId) => {
              const userRef = doc(FIREBASE_DB, "Users", userId);
              const userSnap = await getDoc(userRef);
              userNames[userId] = userSnap.exists()
                ? `${userSnap.data().firstName} ${userSnap.data().lastName}`
                : "Unknown User";
            })
          );

          const sortedUsers = Object.keys(userTasks)
            .map((userId) => ({
              userId,
              name: userNames[userId],
              tasksCompleted: userTasks[userId],
            }))
            .sort((a, b) => b.tasksCompleted - a.tasksCompleted);

          setLeaderboardData(sortedUsers);
        } catch (error) {
          setError("Failed to fetch leaderboard data");
          console.error("Error fetching leaderboard data:", error);
        }
        setIsLoading(false);
      };

      loadLeaderboardData();
    }, [selectedTimeframe])
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: LeaderboardEntry;
    index: number;
  }) => (
    <Animated.View style={[styles.userRow, { opacity: new Animated.Value(1) }]}>
      <Text style={styles.userName}>{`${index + 1}. ${item.name}`}</Text>
      <View style={styles.taskCountContainer}>
        <Text style={styles.taskCount}>{item.tasksCompleted}</Text>
        <Icon
          name="check-circle"
          size={20}
          color="#4CAF50"
          style={styles.iconStyle}
        />
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <SegmentedControl
        values={["Daily", "Weekly", "Monthly"]}
        selectedIndex={["daily", "weekly", "monthly"].indexOf(
          selectedTimeframe
        )}
        onChange={(event) => {
          setSelectedTimeframe(
            ["daily", "weekly", "monthly"][
              event.nativeEvent.selectedSegmentIndex
            ]
          );
        }}
        style={styles.segmentedControl}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={leaderboardData}
          keyExtractor={(item, index) => `${item.userId}-${index}`}
          renderItem={renderItem}
          style={styles.scrollView}
        />
      )}
    </View>
  );
};

export default LeaderboardScreen;
