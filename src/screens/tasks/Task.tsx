import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { Task as TaskModel } from "../../models/Task";
import { fetchTasks, deleteTask } from "../../config/FirestoreTasks";
import { getAuth, User } from "firebase/auth";
import { InsideStackParamList } from "../../navigation/Types";
import styles from "../styles/TaskStyles";

const TasksScreen: React.FC = () => {
  const [tasks, setTasks] = React.useState<TaskModel[]>([]);
  const navigation = useNavigation<NavigationProp<InsideStackParamList>>();
  const auth = getAuth();
  const user = auth.currentUser as User;

  const loadTasks = async () => {
    if (!user) return;
    try {
      const fetchedTasks = await fetchTasks(user.uid);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
    }, [])
  );

  const handleDeleteTask = (taskId: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        onPress: () => console.log("Deletion canceled"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => confirmDelete(taskId),
        style: "destructive",
      },
    ]);
  };

  const confirmDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const renderItem = ({ item }: { item: TaskModel }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("TaskDetail", { taskId: item.id })}
    >
      <View style={styles.taskItem}>
        <View style={styles.taskDetails}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text
            style={item.status ? styles.statusCompleted : styles.statusPending}
          >
            {item.status ? "COMPLETED" : "PENDING"}
          </Text>
        </View>
        <View style={styles.iconsContainer}>
          <View style={styles.insideIconsContainer}>
            <TouchableOpacity
              style={styles.iconEdit}
              onPress={() =>
                navigation.navigate("EditTask", { taskId: item.id })
              }
            >
              <Icon name="edit" size={24} color="#0052cc" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconDelete}
              onPress={() => handleDeleteTask(item.id)}
            >
              <Icon name="delete" size={24} color="#cc0000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Add Task"
        onPress={() => navigation.navigate("AddTask")}
        color="#0052cc"
      />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default TasksScreen;
