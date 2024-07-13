import React from "react";
import { useAuth } from "./src/hooks/UseAuth";
import { AppNavigator } from "./src/navigation/Navigation";

export default function App() {
  const { user, loading } = useAuth();

  return <AppNavigator user={user} loading={loading} />;
}
