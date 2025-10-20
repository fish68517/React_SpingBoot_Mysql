import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

const LoginScreen = () => {
  return (
    <View style={styles.page}>
        <Text>Login Page</Text>
        <Button title="Go to Signup" onPress={() => router.push("/(auth)/signup")} />
        <Button title="Go to Tabs" onPress={() => router.replace("/(tabs)/home")} />
    </View>
  );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default LoginScreen;
