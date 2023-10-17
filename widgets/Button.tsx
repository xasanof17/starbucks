import { TouchableOpacity } from "react-native";
import { Text } from "../components/Themed";
import { useRouter } from "expo-router";

type ButtonProps = {
  title: string;
};

const Button = ({ title }: ButtonProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/(tabs)")}
      style={{
        backgroundColor: "#00623B",
        paddingVertical: 14,
        paddingHorizontal: 50,
        borderRadius: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 22,
          fontWeight: "700",
          textTransform: "capitalize",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
