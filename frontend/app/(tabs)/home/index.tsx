import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.page}>
        <Text>Home Page</Text>
        <Button title="Logout" onPress={() => router.replace("/(auth)/login")} />
        <Button title="Create Post" onPress={() => router.push("/(tabs)/home/create-post")} />
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

export default HomeScreen;
