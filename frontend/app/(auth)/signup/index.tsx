import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

const SignupScreen = () => {
  return (
    <View style={styles.page}>
        <Text>Signup Page</Text>
        <Button title="Go to login" onPress={() => router.replace("/(auth)/login")} />
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

export default SignupScreen;
