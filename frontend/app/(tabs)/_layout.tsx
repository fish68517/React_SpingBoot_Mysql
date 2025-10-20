import { Tabs } from "expo-router";

export default function TabsLayout() {
	return (
		<Tabs screenOptions={{ 
			headerShown: false, 
			headerTitleAlign: "center",
			tabBarActiveTintColor: "#007AFF"
			}}>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
				}}
			/>
			<Tabs.Screen
				name="map"
				options={{
					title: "Map",
				}}
			/>
			<Tabs.Screen
				name="chats"
				options={{
					title: "Chats",
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
				}}
			/>
		</Tabs>
	);
}
