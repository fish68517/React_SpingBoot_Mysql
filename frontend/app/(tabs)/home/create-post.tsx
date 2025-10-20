import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

const CreatePostScreen = () => {
  return (
    <View style={styles.page}>
        <Text>Create Post</Text>
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

export default CreatePostScreen;
