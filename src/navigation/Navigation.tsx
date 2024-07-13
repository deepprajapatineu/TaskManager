import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Task from "../screens/tasks/Task";
import Leaderboard from "../screens/leaderboard/Leaderboard";
import AddTask from "../screens/tasks/AddTask";
import EditTask from "../screens/tasks/EditTask";
import TaskDetail from "../screens/tasks/TaskDetail";
import Login from "../screens/LogIn";
import SignUp from "../screens/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList, InsideStackParamList, TaskDetailScreenProps } from "./types";
import { ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();
const InsideStack = createNativeStackNavigator<InsideStackParamList>();

const InsideLayout = () => (
  <InsideStack.Navigator>
    <InsideStack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
    <InsideStack.Screen name="Task" component={Task} options={{ title: 'Tasks Overview' }}/>
    <InsideStack.Screen name="Leaderboard" component={Leaderboard} options={{ title: 'Leaderboard' }}/>
    <InsideStack.Screen name="AddTask" component={AddTask} options={{ title: 'Add New Task' }}/>
    <InsideStack.Screen name="EditTask" component={EditTask} options={{ title: 'Edit Task' }}/>
    <InsideStack.Screen name="TaskDetail" component={TaskDetail} options={({ route }: TaskDetailScreenProps) => ({ title: route.params?.taskTitle || 'Task Details' })}/>
  </InsideStack.Navigator>
);

export const AppNavigator = ({ user, loading }: { user: any; loading: boolean }) => {
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="LogIn" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
