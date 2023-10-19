import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Text, View } from "../components/Themed";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../components/svg/Logo";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Button from "../widgets/Button";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

type Item = { id: number; image: string; text: string };

const data: Item[] = [
  {
    id: 1,
    image: require("../assets/images/onboarding1.png"),
    text: `“To inspire and nurture the human spirit–one person, one cup and one neighborhood at a time.”`,
  },
  {
    id: 2,
    image: require("../assets/images/onboarding2.png"),
    text: `“To inspire and nurture the human spirit–one person, one cup and one neighborhood at a time.”`,
  },
  {
    id: 3,
    image: require("../assets/images/onboarding3.png"),
    text: `“To inspire and nurture the human spirit–one person, one cup and one neighborhood at a time.”`,
  },
];

export default function OnBoardingScreen() {
  const { width: ScreenWidth } = useWindowDimensions();

  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  function RenderItem({ item }: { item: Item }) {
    return (
      <View style={[styles.container, { width: ScreenWidth }]}>
        <Image
          style={{ width: ScreenWidth, height: 340 }}
          source={item.image}
          placeholder={blurhash}
          contentFit="contain"
          transition={200}
        />
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={styles.title}>
            <Text style={{ color: "#00623B" }}>Coffee</Text> Good Moods
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "PoppinsRegular",
              fontWeight: "400",
              color: "black",
              marginVertical: 20,
            }}
          >
            {item.text}
          </Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Button title="Get Started" />
            <Text
              style={{
                color: "gray",
                fontFamily: "PoppinsMedium",
                fontSize: 18,
                fontWeight: "500",
                marginTop: 20,
              }}
            >
              Already have account ?{" "}
              <Text style={{ color: "#00623B" }}>Log In</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <Logo />
      <Animated.FlatList
        onScroll={onScroll}
        style={{ width: ScreenWidth }}
        data={data}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        horizontal
        bounces={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 34,
    fontFamily: "PoppinsExtraBold",
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
