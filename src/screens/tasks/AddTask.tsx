import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createTask, uploadImage } from "../../config/FirestoreTasks";
import { getAuth, User } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { Task as TaskType } from "../../models/Task";
import styles from "../styles/AddTaskStyles";

const AddTask: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImage(result.assets[0].uri);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleAddTask = async () => {
    if (title.trim() === "" || description.trim() === "") {
      Alert.alert("Error", "Title and description cannot be empty.");
      return;
    }

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const newTask: Partial<TaskType> = {
      title,
      description,
      imageUrl,
      status: false,
      userId: user ? user.uid : "",
    };

    try {
      await createTask(newTask);
      navigation.goBack();
    } catch (error) {
      console.error("Failed to add task:", error);
      Alert.alert("Error", "Failed to create task");
    }
  };

  const toggleModal = () => {
    setImageModalVisible(!imageModalVisible);
  };

  return (
    <View style={styles.container}>
      {image && (
        <TouchableOpacity onPress={toggleModal}>
          <Animated.Image
            source={{ uri: image }}
            style={[styles.imagePreview, { opacity: fadeAnim }]}
          />
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
      <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSubmit} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Submit Task</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonCancel}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonTextCancel}>Cancel</Text>
      </TouchableOpacity>
      {image && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={imageModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.centeredView}>
            <TouchableOpacity style={styles.modalView} onPress={toggleModal}>
              {/* Ensure image is not null before rendering Image component */}
              <Image
                source={{ uri: image as string }}
                style={styles.fullSizeImage}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default AddTask;
