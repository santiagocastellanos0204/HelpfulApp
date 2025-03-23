import { Text, View, TouchableOpacity, Image, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router"; // Correct import for useRouter
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";

// Sample moods data (Replace with real state data)
const moods = [
  {
    id: 1,
    emoji:
      "https://cloud.appwrite.io/v1/storage/buckets/675b6e0c000017f04601/files/67dcce92001ca6767d09/view?project=673562340020d63cd018&mode=admin",
  },
  {
    id: 2,
    emoji:
      "https://cloud.appwrite.io/v1/storage/buckets/675b6e0c000017f04601/files/67dccecc0038fe39393b/view?project=673562340020d63cd018&mode=admin",
  },
  {
    id: 3,
    emoji:
      "https://cloud.appwrite.io/v1/storage/buckets/675b6e0c000017f04601/files/67dcceb30020c32f30da/view?project=673562340020d63cd018&mode=admin",
  },
  {
    id: 4,
    emoji:
      "https://cloud.appwrite.io/v1/storage/buckets/675b6e0c000017f04601/files/67dcced4002c8265129f/view?project=673562340020d63cd018&mode=admin",
  },
  {
    id: 5,
    emoji:
      "https://cloud.appwrite.io/v1/storage/buckets/675b6e0c000017f04601/files/67dccebd0031c0ae011d/view?project=673562340020d63cd018&mode=admin",
  },
  {
    id: 6,
    emoji:
      "https://cloud.appwrite.io/v1/storage/buckets/675b6e0c000017f04601/files/67dccea60030f3f01177/view?project=673562340020d63cd018&mode=admin",
  },
  {
    id: 7,
    emoji:
      "https://cloud.appwrite.io/v1/storage/buckets/675b6e0c000017f04601/files/67dccedb00152547acab/view?project=673562340020d63cd018&mode=admin",
  },
  {
    id: 8,
    emoji:
      "https://cloud.appwrite.io/v1/storage/buckets/675b6e0c000017f04601/files/67dccec50008c8cab8f2/view?project=673562340020d63cd018&mode=admin",
  },
];

// Format Date Function
const getFormattedDate = () => {
  const date = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

// Home Page of the application
const Home = () => {
  const router = useRouter(); // Initialize the router
  const { user, darkMode, setDarkMode } = useGlobalContext();

  useEffect(() => {
    // Dynamically update the status bar when darkMode changes
    StatusBar.setBarStyle(darkMode ? "light-content" : "dark-content");
  }, [darkMode]);

  return (
    <SafeAreaView
      className={`flex-1 px-4 ${darkMode ? "bg-[#22222c]" : "bg-[#ececec]"}`}
    >
      <View className="relative flex-row justify-center mt-2">
        {/* Centered Logo */}
        <Image
          source={darkMode ? icons.whitelogo : icons.logo}
          className="w-12 h-12"
          resizeMode="contain"
        />

        {/* Moon Button in Top-Right */}
        <TouchableOpacity
          className={`w-14 h-14 rounded-full shadow-md justify-center items-center absolute right-4 ${
            darkMode ? "bg-[#e0e0e0]" : "bg-[#3b3b3b]"
          }`}
          onPress={() => setDarkMode(!darkMode)}
        >
          <Image
            source={darkMode ? icons.moon : icons.whitemoon}
            className="w-7 h-7"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Date & Welcome Message */}
      <Text
        className={`text-center text-[16px] font-pregular mt-4 ${
          darkMode ? "text-gray-400" : "text-gray-700"
        }`}
      >
        {getFormattedDate()}
      </Text>
      <Text
        className={`text-center text-[28px] font-psemibold mt-1 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Welcome, {user.name.split(" ")[0]}
      </Text>

      {/* Mood Selection */}
      <Text
        className={`text-[20px] font-psemibold text-center mt-5 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        How are you feeling?{"\n"}
      </Text>

      <View className="flex-row flex-wrap justify-center gap-7">
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.id}
            className="w-16 h-16 rounded-full justify-center items-center"
            onPress={() => {
              router.push(`../(crud)/create?moodId=${mood.id}`);
            }}
          >
            <Image
              source={{ uri: mood.emoji }}
              className="w-16 h-16"
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Quote of the Day Section */}
      <View
        className="mt-10 p-10 w-full rounded-3xl border-8 justify-center items-center text-center"
        style={{ borderColor: "#8DDC80" }}
      >
        <Text
          className={`text-center text-[24px] font-psemibold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Quote of the Day
        </Text>
        <Text
          className={`text-center text-[16px] mt-4 font-pregular ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          "It always seems impossible until it's done" - Nelson Mandela
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
