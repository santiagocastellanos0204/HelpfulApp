import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { signOut } from "../../lib/appwrite";
import { router } from "expo-router";

// Profile Page of the application displaying user information
const Profile = () => {
  const { user, setIsLoggedIn } = useGlobalContext();
  const { darkMode } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setIsLoggedIn(false);
    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView
      className={`flex-1 px-6 ${darkMode ? "bg-[#22222c]" : "bg-[#ececec]"}`}
    >
      {/* Icon */}
      <View className="items-center mt-2">
        <Image
          source={darkMode ? icons.whitelogo : icons.logo}
          className="w-12 h-12"
          resizeMode="contain"
        />
      </View>

      {/* Profile Title */}
      <View className="mt-6">
        <Text
          className={`text-center text-[40px] font-psemibold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Profile
        </Text>
      </View>

      {/* Profile Details */}
      <View className="mt-8 w-80 self-center">
        {/* Name */}
        <View className="flex-row items-center mb-4">
          <Text
            className={`text-black text-[18px] font-pbold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Name:{" "}
          </Text>
          <Text
            className={`text-black text-[18px] font-pmedium ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            {user.name}
          </Text>
        </View>
        <View
          style={{ borderBottomWidth: 3, borderBottomColor: "#8DDC80" }}
          className="mt-1 mb-3"
        />

        {/* Email */}
        <View className="flex-row items-center mb-4">
          <View className="flex-row items-center mt-2">
            <Text
              className={`text-black text-[18px] font-pbold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Email:{" "}
            </Text>
            <Text
              className={`text-black text-[18px] font-pmedium ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {user.email}
            </Text>
          </View>
        </View>
        <View
          style={{ borderBottomWidth: 3, borderBottomColor: "#8DDC80" }}
          className="mt-1 mb-3"
        />

        {/* Birthday */}
        {/* <View className="flex-row items-center mb-4">
          <View className="flex-row items-center mt-2">
            <Text
              className={`text-black text-[18px] font-pbold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Birthday:{" "}
            </Text>
            <Text
              className={`text-black text-[18px] font-pmedium ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              February 4th, 2004
            </Text>
          </View>
        </View>
        <View
          style={{ borderBottomWidth: 3, borderBottomColor: "#8DDC80" }}
          className="mt-1 mb-3"
        /> */}

        {/* Password */}
        <View className="flex-row items-center mb-4">
          <View className="flex-row items-center mt-2">
            <Text
              className={`text-black text-[18px] font-pbold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Password:{" "}
            </Text>
            <Text
              className={`text-black text-[18px] font-pmedium ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              ***********
            </Text>
          </View>
        </View>
        <View
          style={{ borderBottomWidth: 3, borderBottomColor: "#8DDC80" }}
          className="mt-1 mb-3"
        />

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-red-600 rounded-full py-4 items-center mt-4"
          onPress={logout}
        >
          <Text className="text-white text-[18px] font-pbold">Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
