import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function LocationModal({ visible, onClose, onSelect }) {
  const [query, setQuery] = useState("");
  const locations = ["Current Location", "Armory House", "Ikenberry"];

  const filtered = locations.filter((l) =>
    l.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Enter your location"
            value={query}
            onChangeText={setQuery}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setQuery("")}>
            <Text style={styles.clear}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* 搜索结果列表 */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => onSelect(item)}
            >
              <Text style={styles.icon}>📍</Text>
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F26B21",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  back: {
    fontSize: 18,
    color: "#F26B21",
    marginRight: 6,
  },
  clear: {
    color: "#F26B21",
    fontSize: 18,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  icon: {
    marginRight: 10,
    color: "#F26B21",
  },
  text: {
    fontSize: 16,
  },
});
