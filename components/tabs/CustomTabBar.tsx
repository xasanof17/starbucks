import { FC } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View } from "../Themed";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

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
      default:
        break;
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
  const { width } = useWindowDimensions();
  const margin = 20;
  const tabBarWidth = width - 2 * margin;
  const tabWidth = tabBarWidth / state.routes.length;

  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(tabWidth * state.index) }],
    };
  });

  return (
    <View
      style={[styles.tabBarContainer, { width: tabBarWidth, bottom: margin }]}
    >
      <Animated.View
        style={[
          styles.slidingTabContainer,
          { width: tabWidth },
          translateAnimation,
        ]}
      >
        <View style={styles.slidingTab} />
      </Animated.View>
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
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
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
    flex: 1,
    flexDirection: "row",
    height: 70,
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "#000001",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  slidingTabContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  slidingTab: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: "#eee",
  },
});

export default CustomTabBar;
