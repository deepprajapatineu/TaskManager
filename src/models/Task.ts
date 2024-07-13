import { Timestamp } from "firebase/firestore";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: boolean;
  userId: string;
  imageUrl?: string;
  createdAt?: Timestamp;
  completedAt?: Timestamp | null;
}
