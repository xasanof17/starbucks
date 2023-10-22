import {
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";
import { View } from "../Themed";

type BottomTabIcon = {
  route: string;
  isFocused: boolean;
};

const BottomTabIcon = ({ route, isFocused }: BottomTabIcon) => {
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

export default BottomTabIcon;
