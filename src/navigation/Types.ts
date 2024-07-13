import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
  Inside: undefined;
};

export type InsideStackParamList = {
  Home: undefined;
  Task: undefined;
  Leaderboard: undefined;
  AddTask: undefined;
  EditTask: { taskId: string };
  TaskDetail: { taskId: string ; taskTitle: string};
};

export type TaskDetailScreenProps = NativeStackScreenProps<
  InsideStackParamList,
  "TaskDetail"
>;
