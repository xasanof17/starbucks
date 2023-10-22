import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import CustomTab from "./CustomTab";

const CustomTabBar = (props: BottomTabBarProps) => {
  return <CustomTab {...props} />;
};

export default CustomTabBar;
