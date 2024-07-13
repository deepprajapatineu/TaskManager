import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  Switch,
  ActivityIndicator,
  Modal,
  Animated,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  updateTask,
  uploadImage,
  fetchTaskById,
} from "../../config/FirestoreTasks";
import * as ImagePicker from "expo-image-picker";
import { Task } from "../../models/Task";
import styles from "../styles/EditTaskStyles";

type RouteParams = {
  taskId: string;
};

const EditTask: React.FC = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0));
  const navigation = useNavigation();
  const route = useRoute();
  const { taskId } = route.params as RouteParams;

  useEffect(() => {
    const loadTaskData = async () => {
      const fetchedTask = await fetchTaskById(taskId);
      if (fetchedTask) {
        setTask(fetchedTask);
        setTitle(fetchedTask.title);
        setDescription(fetchedTask.description);
        setStatus(fetchedTask.status);
        setImage(fetchedTask.imageUrl || "");
        fadeAnim.current.setValue(fetchedTask.imageUrl ? 1 : 0);
      }
    };
    loadTaskData();
  }, [taskId]);

  const handleSelectImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setUploading(true);
      setImage(pickerResult.assets[0].uri);
      Animated.timing(fadeAnim.current, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setUploading(false);
    }
  };

  const handleUpdateTask = async () => {
    let imageUrl = image;
    if (image && !image.startsWith("http")) {
      setUploading(true);
      imageUrl = await uploadImage(image);
      setUploading(false);
    }

    const updatedTask = {
      id: taskId,
      title,
      description,
      status,
      imageUrl,
    };

    try {
      await updateTask(updatedTask);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to update task");
    }
  };

  const toggleModal = () => {
    setImageModalVisible(!imageModalVisible);
  };

  return (
    <View style={styles.container}>
      {task ? (
        <>
          {image && (
            <TouchableOpacity onPress={toggleModal}>
              {uploading ? (
                <ActivityIndicator size="large" color="#0052cc" />
              ) : (
                <Animated.Image
                  source={{ uri: image }}
                  style={[styles.imagePreview, { opacity: fadeAnim.current }]}
                />
              )}
            </TouchableOpacity>
          )}
          <TextInput
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Task Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>
              {status ? "Completed" : "Pending"}
            </Text>
            <Switch
              trackColor={{ false: "#d6d6d6", true: "#81b0ff" }}
              thumbColor={status ? "#4caf50" : "#f44336"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setStatus}
              value={status}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
            <Text style={styles.buttonText}>Change Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSave}
            onPress={handleUpdateTask}
          >
            <Text style={styles.buttonText}>Update Task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonTextCancel}>Cancel</Text>
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={imageModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={styles.centeredView}>
              <TouchableOpacity style={styles.modalView} onPress={toggleModal}>
                <Image source={{ uri: image }} style={styles.fullSizeImage} />
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      ) : (
        <ActivityIndicator size="large" color="#0052cc" />
      )}
    </View>
  );
};

export default EditTask;
