// _layout.tsx
import { Stack } from "expo-router";
import { AuthProvider } from "./authContext"; //

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home Screen" }} />
        <Stack.Screen name="register" options={{ title: "Register" }} />
        <Stack.Screen name="mainPage" options={{ title: "Main Page" }} />
        <Stack.Screen name="friends" options={{ title: "Friends" }} />
        <Stack.Screen name="accreptFriendRequest" options={{ title: "AccreptFriendRequest" }} />
        <Stack.Screen name="addNewFriend" options={{ title: "AddNewFriend" }} />
        
        <Stack.Screen name="createGroup" options={{ title: "Create Group" }} />
        <Stack.Screen name="groups" options={{ title: "Groups" }} />
        <Stack.Screen name="groupDetail" options={{ title: "GroupDetail" }} />
        <Stack.Screen name="groupMessaging" options={{ title: "GroupMessaging" }} />
      
      </Stack>
    </AuthProvider>
  );
}
