import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./context/AuthContext";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  const [showHome, setShowHome] = useState(true); // ✅ 临时设成 true 看 Home

  // 以后可以通过登录状态控制
  // useEffect(() => {
  //   // 比如检测 AuthContext 是否登录
  //   if (user) setShowHome(true);
  // }, [user]);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {showHome ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
