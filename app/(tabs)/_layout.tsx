import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { CustomTabBar } from "../../components";
import Colors from "../../constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={CustomTabBar}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
        }}
      />
      <Tabs.Screen
        name="ticket"
        options={{
          title: "Ticket",
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          title: "Location",
        }}
      />
    </Tabs>
  );
}
