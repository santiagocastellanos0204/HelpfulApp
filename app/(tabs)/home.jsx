import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
//import { useGlobalContext } from "../context/GlobalProvider";
import { icons } from "../../constants";
import TabsLayout from "../(tabs)/_layout";

// Sample moods data (Replace with real state data)
const moods = [
  { id: 1, emoji: icons.cheery },
  { id: 2, emoji: icons.happy },
  { id: 3, emoji: icons.calm },
  { id: 4, emoji: icons.neutral },
  { id: 5, emoji: icons.angry },
  { id: 6, emoji: icons.anxious },
  { id: 7, emoji: icons.sad },
  { id: 8, emoji: icons.depressed },
];

// Sample journal entries (Replace with real API data)
const journalEntries = [
  {
    id: 1,
    title: "Productive Day",
    date: "4/9/25",
    description: "Today was a great day, I started off...",
    emoji: icons.happy,
  },
  {
    id: 2,
    title: "A Very Cheery Day",
    date: "4/8/25",
    description: "I got an A on my final exam and...",
    emoji: icons.cheery,
  },
];

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      {/* Logo */}
      <View className="items-center mt-2">
        <Image source={icons.logo} className="w-12 h-12" resizeMode="contain" />
      </View>

      {/* Header */}
      <View className="flex-row justify-between items-center w-full mt-4 px-2">
        {/* Left Side - Welcome Text */}
        <View>
          <Text className="text-[36px] font-psemibold leading-[40px]">
            Welcome,
          </Text>
          <Text className="text-[36px] font-psemibold leading-[40px]">
            Robert
          </Text>
        </View>

        {/* Right Side - Date & Icons */}
        <View className="items-end">
          {/* Date - Aligned to the Right */}
          <Text className="text-[20px] font-psemibold mb-2">4/9/2025</Text>

          {/* Icons Row - Positioned Below the Date */}
          <View className="flex-row space-x-3">
            <TouchableOpacity className="bg-white w-16 h-16 rounded-full shadow-md justify-center items-center">
              <Image
                source={icons.moon}
                className="w-8 h-8"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              className="w-16 h-16 rounded-full shadow-lg justify-center items-center"
              style={{ backgroundColor: "#8DDC80" }}
            >
              <Image
                source={icons.customize}
                className="w-10 h-10"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Mood Selection */}
      <Text className="text-[20px] font-psemibold text-center mt-5">
        How are you feeling today?{"\n"}
      </Text>

      <View className="flex-row flex-wrap justify-center gap-7">
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.id}
            className={`w-16 h-16 rounded-full justify-center items-center`}
          >
            <Image
              source={mood.emoji}
              className="w-16 h-216"
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Journals Section */}
      <Pressable
        className="rounded-3xl p-4 mt-5 opacity-90"
        style={{ backgroundColor: "#8DDC80" }}
        onPress={() => router.push("/journal")} // Navigates to the Journal page
      >
        <Text className="text-[24px] font-psemibold text-center">Journals</Text>

        <FlatList
          data={journalEntries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="bg-white rounded-xl p-4 flex-row items-center mt-3 shadow-sm opacity-90 relative">
              {/* Mood Image */}
              <View className="w-10 h-10 rounded-full justify-center items-center">
                <Image
                  source={item.emoji}
                  className="w-13 h-10"
                  resizeMode="contain"
                />
              </View>

              {/* Text Content */}
              <View className="flex-1 ml-4">
                <Text className="text-[16px] font-psemibold">{item.title}</Text>
                <Text className="text-[11px] text-gray-600 font-pregular mt-1">
                  {item.description}
                </Text>
              </View>

              {/* Date - Positioned at Top Right */}
              <Text className="absolute top-2 right-3 text-[11px] text-gray-500 font-pregular">
                {item.date}
              </Text>
            </View>
          )}
        />
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;
