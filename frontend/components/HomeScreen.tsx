import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LocationModal from "../components/LocationModal";
import CreatePostScreen from "./CreatePostScreen"; // 别人写的组件

const HomeScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState("Illinois");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCreatePost, setShowCreatePost] = useState(false); 

  const categories = ["All", "ID cards", "Water bottle", "AirPods"];

  // 如果进入发帖界面，则显示 CreatePostScreen
  if (showCreatePost) {
    return <CreatePostScreen onBack={() => setShowCreatePost(false)} />;
  }

  return (
    <View style={styles.container}>
      /*Navigation Bar导航栏 */
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/snack-icon.png")}
            style={{ width: 28, height: 28, marginRight: 6 }}
          />
          <Text style={styles.logoText}>L&F</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="help-circle" size={28} color="white" />
        </TouchableOpacity>
      </View>

      /* Search搜索*/
      <View style={styles.searchRow}>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="location" size={16} color="#fff" />
          <Text style={styles.locationText}>{selectedLocation}</Text>
        </TouchableOpacity>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color="#F26B21" />
          <Text style={styles.placeholder}>Search anything...</Text>
        </View>
      </View>

      /* Title标题 */
      <Text style={styles.sectionTitle}>Latest finds.</Text>

      /* Category button分类按钮 */
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categoryActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && { color: "#fff" },
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      /* Card Grid卡片网格 */
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <View key={item} style={styles.card}>
              <View style={styles.imagePlaceholder} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Lost</Text>
              </View>
              <View style={styles.userInfo}>
                <View style={styles.avatar} />
                <View>
                  <Text style={styles.userName}>User Name</Text>
                  <Text style={styles.userLocation}>Location</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      /* Floating Add Button Floating Add Button悬浮添加按钮*/
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowCreatePost(true)} // Click to switch to the posting page
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

      /* Bottom Navigation Bar底部导航栏 */
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={24} color="#FF6E00" />
        <Ionicons name="map" size={24} color="white" />
        <Ionicons name="chatbubble" size={24} color="white" />
        <Ionicons name="person" size={24} color="white" />
      </View>

      /* Location Pop-up地点弹窗 */
      <LocationModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      onSelect={(loc: string) => {
        setSelectedLocation(loc);
        setModalVisible(false);
    }}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#FF6E00",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logoContainer: { flexDirection: "row", alignItems: "center" },
  logoText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#002147",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 20,
    gap: 8,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6E00",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  locationText: { color: "white", fontWeight: "600", marginLeft: 4 },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF6E00",
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 40,
  },
  placeholder: { color: "#777", marginLeft: 6 },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "700",
    fontStyle: "italic",
    marginTop: 25,
    marginLeft: 20,
    color: "#0D0628",
  },
  categoryScroll: { marginTop: 12, paddingLeft: 20 },
  categoryButton: {
    borderWidth: 1,
    borderColor: "#FF6E00",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  categoryActive: { backgroundColor: "#FF6E00" },
  categoryText: { fontSize: 12, fontWeight: "500", color: "#000" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 15,
  },
  card: {
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imagePlaceholder: {
    height: 100,
    backgroundColor: "#D9D9D9",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  badge: {
    backgroundColor: "#FF6E00",
    alignSelf: "flex-start",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
    marginTop: 6,
  },
  badgeText: { color: "#fff", fontSize: 10 },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 10,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#D9D9D9",
    marginRight: 6,
  },
  userName: { fontSize: 10, fontWeight: "500" },
  userLocation: { fontSize: 10, color: "#666" },
  addButton: {
    backgroundColor: "#FF6E00",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 80,
    right: 20,
    elevation: 5,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#002147",
    height: 60,
    alignItems: "center",
  },
});

export default HomeScreen;
