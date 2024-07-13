import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { fetchTaskById } from "../../config/FirestoreTasks";
import { format, intervalToDuration } from "date-fns";
import { MaterialIcons } from "@expo/vector-icons";
import { Task } from "../../models/Task";
import styles from "../styles/TaskDetailStyles";

const TaskDetail = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0));
  const route = useRoute();
  const { taskId } = route.params as { taskId: string };

  useEffect(() => {
    const loadTask = async () => {
      try {
        const fetchedTask = await fetchTaskById(taskId);
        if (fetchedTask) {
          setTask(fetchedTask);
          Animated.timing(fadeAnim.current, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }).start();
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    loadTask();
  }, [taskId]);

  const toggleModal = () => {
    setImageModalVisible(!imageModalVisible);
  };

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const parseDate = (date: any) => {
    return date ? format(date.toDate(), "PPP") : "N/A";
  };

  const startDate = parseDate(task.createdAt);
  const endDate = task.completedAt ? parseDate(task.completedAt) : "Pending";

  const duration =
    task.createdAt && task.completedAt
      ? intervalToDuration({
          start: task.createdAt.toDate(),
          end: task.completedAt.toDate(),
        })
      : null;
  const formatDuration = () => {
    if (!duration) return "Pending Work";
    const parts = [];
    console.log("Dudu:", duration);
    if (duration.days) parts.push(`${duration.days} day`);
    if (duration.hours) parts.push(`${duration.hours} hr`);
    if (duration.minutes) parts.push(`${duration.minutes} min`);
    if (duration.seconds) parts.push(`${duration.seconds} sec`);
    return parts.join(" , ");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {task.imageUrl && (
        <TouchableOpacity onPress={toggleModal}>
          <Image source={{ uri: task.imageUrl }} style={styles.image} />
        </TouchableOpacity>
      )}
      <Animated.View style={[styles.card, { opacity: fadeAnim.current }]}>
        <MaterialIcons name="title" size={24} color="black" />
        <View style={styles.separator} />
        <Text style={styles.title}>{task.title}</Text>
      </Animated.View>
      <Animated.View style={[styles.card, { opacity: fadeAnim.current }]}>
        <MaterialIcons name="description" size={24} color="black" />
        <View style={styles.separator} />
        <ScrollView nestedScrollEnabled={true} style={styles.descriptionScroll}>
          <Text style={styles.description}>{task.description}</Text>
        </ScrollView>
      </Animated.View>
      <Animated.View style={[styles.card, { opacity: fadeAnim.current }]}>
        <MaterialIcons name="date-range" size={24} color="black" />
        <View style={styles.separator} />
        <Text style={styles.info}>Start Date: {startDate}</Text>
      </Animated.View>
      <Animated.View style={[styles.card, { opacity: fadeAnim.current }]}>
        <MaterialIcons name="date-range" size={24} color="black" />
        <View style={styles.separator} />
        <Text style={styles.info}>End Date: {endDate}</Text>
      </Animated.View>
      <Animated.View style={[styles.card, { opacity: fadeAnim.current }]}>
        <MaterialIcons name="timer" size={24} color="black" />
        <View style={styles.separator} />
        <Text
          style={[
            styles.info,
            task.completedAt ? styles.statusCompleted : styles.statusPending,
          ]}
        >
          {formatDuration()}
        </Text>
      </Animated.View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.centeredView}>
          <TouchableOpacity style={styles.modalView} onPress={toggleModal}>
            <Image
              source={{ uri: task.imageUrl }}
              style={styles.fullSizeImage}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default TaskDetail;
