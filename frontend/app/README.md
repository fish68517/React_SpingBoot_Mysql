This project uses Expo Router for navigation.
Each tab (Home, Chats, Map, Profile) is represented by a folder inside app/(tabs)/.

app/
└── (tabs)/
    ├── home/
    ├── chats/
    ├── map/
    └── profile/

# 📁 Folder Rules

Each folder = one tab in the bottom navigation bar.

Each folder can contain its own stack of screens (e.g., Home → Create Post → Item Details).

The index.tsx file inside a tab folder is that tab’s main screen.

# 🧱 Example Structure 
app/
└── (tabs)/
    ├── home/
    │   ├── index.tsx          → main home screen (/tabs/home)
    │   ├── create-post.tsx    → create post page (/tabs/home/create-post)
    │   ├── [id].tsx           → dynamic item page (/tabs/home/[id])
    │   └── _layout.tsx        → defines stack for Home tab
    ├── chats/
    │   └── index.tsx          → chats screen (/tabs/chats)
    ├── map/
    │   └── index.tsx          → map screen (/tabs/map)
    └── profile/
        └── index.tsx          → profile screen (/tabs/profile)

# ➕ Adding a New Page

Go to the correct tab folder, e.g. app/(tabs)/home/

Create a new file named after your route:

settings.tsx → /tabs/home/settings

[id].tsx → /tabs/home/:id (for dynamic routes)

Inside the file, export a React component:

```javascript
import { View, Text } from "react-native";

export default function SettingsScreen() {
  return (
    <View>
      <Text>Settings Page</Text>
    </View>
  );
}
```

The new screen is automatically added to the stack (if _layout.tsx exists).

# 🚀 Navigating Between Pages

Use Expo Router’s navigation helpers:

```javascript
import { router } from "expo-router";

// Push onto stack (go forward)
router.push("/(tabs)/home/create-post");

// Replace current route (no back)
router.replace("/(auth)/login");

// Go back
router.back();
```

# ⚙️ Adding a New Stack Layout (Optional)

If a tab doesn’t have _layout.tsx yet, create one to manage multiple pages:

```javascript
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Main" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
    </Stack>
  );
}
```