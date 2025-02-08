import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../../constants";

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      {/* Icon */}
      <View className="items-center mt-2">
        <Image source={icons.logo} className="w-12 h-12" resizeMode="contain" />
      </View>

      {/* Profile Title */}
      <View className="mt-6">
        <Text className="text-center text-[40px] font-psemibold">Profile</Text>
      </View>

      {/* Profile Details */}
      <View className="mt-8 w-80 self-center">
        {/* Name */}
        <View className="flex-row items-center mb-4">
          <Text className="text-black text-[18px] font-pbold">Name: </Text>
          <Text className="text-black text-[18px] font-pmedium">
            Robert Johnson
          </Text>
        </View>
        <View
          style={{ borderBottomWidth: 3, borderBottomColor: "#8DDC80" }}
          className="mt-1 mb-3"
        />

        {/* Email */}
        <View className="flex-row items-center mb-4">
          <View className="flex-row items-center mt-2">
            <Text className="text-black text-[18px] font-pbold">Email: </Text>
            <Text className="text-black text-[18px] font-pmedium">
              robertjohnson@gmail.com
            </Text>
          </View>
        </View>
        <View
          style={{ borderBottomWidth: 3, borderBottomColor: "#8DDC80" }}
          className="mt-1 mb-3"
        />

        {/* Password */}
        <View className="flex-row items-center mb-4">
          <View className="flex-row items-center mt-2">
            <Text className="text-black text-[18px] font-pbold">
              Password:{" "}
            </Text>
            <Text className="text-black text-[18px] font-pmedium">
              ************
            </Text>
          </View>
        </View>
        <View
          style={{ borderBottomWidth: 3, borderBottomColor: "#8DDC80" }}
          className="mt-1 mb-3"
        />

        {/* Journal Password */}
        <View className="flex-row items-center mb-4">
          <View className="flex-row items-center mt-2">
            <Text className="text-black text-[18px] font-pbold">
              Journal Password:
            </Text>
            <Text className="text-black text-[18px] font-pmedium">
              {" "}
              *******
            </Text>
          </View>
        </View>
        <View
          style={{ borderBottomWidth: 3, borderBottomColor: "#8DDC80" }}
          className="mt-1 mb-3"
        />

        {/* Delete Account */}
        <View className="flex-row items-center mt-2">
          <Text className="text-red-600 text-[18px] font-pbold mb-4">
            Delete Account
          </Text>
        </View>
        <View
          style={{ borderBottomWidth: 3, borderBottomColor: "#8DDC80" }}
          className="mt-1 mb-3"
        />

        {/* Logout Button */}
        <TouchableOpacity className="bg-red-600 rounded-full py-4 items-center mt-4">
          <Text className="text-white text-[18px] font-pbold">Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
