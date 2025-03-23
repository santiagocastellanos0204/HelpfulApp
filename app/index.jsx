import { StatusBar } from "expo-status-bar";
import { Text, View, Image, ScrollView } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../constants";
import CustomButton from "../components/CustomButton";
import LogInButton from "../components/LogInButton";
import { useGlobalContext } from "../context/GlobalProvider";

// Root page that asks the user to sign in or register for an account
export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={icons.logo}
            className="w-12 h-12"
            resizeMode="contain"
          />
          <Image
            source={images.cards2}
            style={{
              width: 420,
              height: 420,
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              top: -20,
            }}
          />

          <View className="relative mt-5">
            <Text className="text-[32px] font-pbold text-center text-[#373440] relative top-[-80px]">
              Welcome to Helpful
            </Text>
          </View>

          <Text className="text-[16px] font-pregular text-center text-[#373440] relative top-[-70px]">
            Personalized support and mood
          </Text>

          <Text className="text-[16px] font-pregular text-center text-[#373440] relative top-[-70px]">
            tracking tailored to your well-being.
          </Text>

          <CustomButton
            title="Create an Account"
            handlePress={() => router.push("/sign-up")}
            containerStyles="w-full relative top-[-40px]"
          />

          <LogInButton
            title="Log In"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full relative top-[-25px]"
          />
        </View>
      </ScrollView>

      <StatusBar style="auto"></StatusBar>
    </SafeAreaView>
  );
}
