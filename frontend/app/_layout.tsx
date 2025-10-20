import { Stack } from "expo-router";
import { useState } from "react";
import { AuthProvider } from "../context/AuthContext";  

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="(auth)" />
        )}
      </Stack>
    </AuthProvider>
  );
}
