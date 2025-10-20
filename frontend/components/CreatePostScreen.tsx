import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CreatePostScreen = ({ onBack }: { onBack: () => void }) => (
    <View style={styles.page}>
        <Text>Create Post Page</Text>
        <Button title="Back" onPress={onBack} />
    </View>
);

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default CreatePostScreen;