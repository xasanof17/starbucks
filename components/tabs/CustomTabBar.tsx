import { FC } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View } from "../Themed";
import { Pressable, StyleSheet } from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";

type BottomTabIcon = {
  route: string;
  isFocused: boolean;
};

const BottomTabIcon: FC<BottomTabIcon> = ({ route, isFocused }) => {
  const renderIcon = (route: string, isFocused: boolean) => {
    const iconColor = isFocused ? "#00623B" : "#000";
    const size = 24;
    switch (route) {
      case "index":
        return <Feather name="home" size={size} color={iconColor} />;
      case "wallet":
        return <Ionicons name="wallet" size={size} color={iconColor} />;
      case "cart":
        return (
          <MaterialCommunityIcons
            name="cart-outline"
            size={size}
            color={iconColor}
          />
        );
      case "ticket":
        return (
          <MaterialCommunityIcons name="ticket" size={size} color={iconColor} />
        );
      case "location":
        return (
          <SimpleLineIcons name="location-pin" size={size} color={iconColor} />
        );
    }
  };
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {renderIcon(route, isFocused)}
    </View>
  );
};

const CustomTab: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, { merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <BottomTabIcon route={route.name} isFocused={isFocused} />
          </Pressable>
        );
      })}
    </View>
  );
};

const CustomTabBar: FC<BottomTabBarProps> = (props) => {
  return <CustomTab {...props} />;
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    height: 60,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    bottom: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
});

export default CustomTabBar;
