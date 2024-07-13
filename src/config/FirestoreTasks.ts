import { FIREBASE_DB, FIREBASE_STORAGE } from './Firebase'; 
import { Task } from '../models/Task';
import { ref, uploadBytes, getDownloadURL, StorageReference } from 'firebase/storage';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  getDoc,
  DocumentData,
  DocumentReference
} from 'firebase/firestore';


type TaskData = Omit<Task, 'id'>;

// Function to upload an image and return the URL
export const uploadImage = async (imageUrl: string): Promise<string> => {
  const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
  const storageRef: StorageReference = ref(FIREBASE_STORAGE, `tasks/${filename}`);
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const snapshot = await uploadBytes(storageRef, blob);
  return getDownloadURL(snapshot.ref);
};

// Create a task with optional image handling
export const createTask = async (taskData: TaskData): Promise<void> => {
  const tasksCol = collection(FIREBASE_DB, 'Tasks');
  await addDoc(tasksCol, {
    ...taskData,
    createdAt: Timestamp.now(),
  });
};

// Fetch all tasks for a specific user
export const fetchTasks = async (userId: string): Promise<Task[]> => {
  const tasksCol = collection(FIREBASE_DB, 'Tasks');
  const q = query(tasksCol, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    ...doc.data() as Task,
    id: doc.id,
  }));
};

// Update a task with optional image handling
export const updateTask = async (taskData: Partial<Task> & { id: string }): Promise<void> => {
  const taskRef: DocumentReference<DocumentData> = doc(FIREBASE_DB, 'Tasks', taskData.id);
  const updates: Partial<Task> & { completedAt?: Timestamp | null } = {...taskData};
  if (taskData.status) {
    updates.completedAt = Timestamp.now();
  } else {
    updates.completedAt = null;
  }
  await updateDoc(taskRef, updates);
};

export const deleteTask = async (taskId: string): Promise<void> => {
  const taskDoc: DocumentReference = doc(FIREBASE_DB, 'Tasks', taskId);
  await deleteDoc(taskDoc);
};

export const fetchTaskById = async (taskId: string): Promise<Task> => {
  const docRef = doc(FIREBASE_DB, 'Tasks', taskId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { ...docSnap.data() as Task, id: taskId };
  } else {
    throw new Error('No such document!');
  }
};
