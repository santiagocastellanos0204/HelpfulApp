import { StatusBar } from "expo-status-bar";
import { Text, View, Image, ScrollView } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import LogInButton from "../components/LogInButton";
import CustomCarousel from "../components/CustomCarousel";
import { useGlobalContext } from "../context/GlobalProvider";

const imageList = [
  images.cards,
  images.cards2,
  images.cards3,
  images.cards4,
  images.cards5,
];

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[125px] h-[85px] relative top-[-10px]"
            resizeMode="contain"
          />

          {/* <Image
            source={images.cards}
            className="w-[420px] h-[420px] relative top-[-65px]"
            resizeMode="contain"
          /> */}
          <View
            style={{
              width: 420,
              height: 420,
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              top: -60,
              left: 10,
            }}
          >
            <CustomCarousel data={imageList} />
          </View>

          <View className="relative mt-5">
            <Text className="text-[32px] font-pbold text-center text-[#373440] relative top-[-120px]">
              Welcome to Helpful
            </Text>
          </View>

          <Text className="text-[16px] font-pregular text-center text-[#373440] relative top-[-110px]">
            Your path to mental wellness begins.
          </Text>

          <Text className="text-[16px] font-pregular text-center text-[#373440] relative top-[-110px]">
            Personalized support and mood
          </Text>

          <Text className="text-[16px] font-pregular text-center text-[#373440] relative top-[-110px]">
            tracking tailored to your well-being.
          </Text>

          <CustomButton
            title="Create an Account"
            handlePress={() => router.push("/sign-up")}
            containerStyles="w-full relative top-[-80px]"
          />

          <View className="flex-row items-center justify-center relative top-[-70px]">
            <View
              style={{
                width: 125,
                height: 1.5,
                backgroundColor: "#000000",
              }}
            />
            <Text className="text-[18px] font-psemibold text-center text-[#373440] mx-2">
              OR
            </Text>
            <View
              style={{ width: 125, height: 1.5, backgroundColor: "#000000" }}
            />
          </View>

          <LogInButton
            title="Log In"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full relative top-[-60px] bg-[#FFFFFF]"
          />
        </View>
      </ScrollView>

      <StatusBar style="auto"></StatusBar>
    </SafeAreaView>
  );
}
