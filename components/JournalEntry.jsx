import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useGlobalContext } from "../context/GlobalProvider";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2);

  return `${month}/${day}/${year}`;
};

const JournalEntry = ({ entry: { mood, title, entry, date } }) => {
  const { darkMode } = useGlobalContext();

  return (
    <View
      className="rounded-3xl p-4 flex-row items-center mt-2 relative"
      style={{
        backgroundColor: darkMode ? "#373440" : "#FFFFFF",
        borderColor: darkMode ? "transparent" : "#E0E0E0",
      }}
    >
      {/* Mood Image */}
      <View className="w-12 h-12 rounded-full justify-center items-center">
        <Image
          source={{ uri: mood }}
          className="w-14 h-14"
          resizeMode="contain"
        />
      </View>

      {/* Text Content */}
      <View style={{ width: 275 }}>
        <View className="flex-1 ml-4">
          <Text
            className="text-[18px] font-psemibold"
            style={{ color: darkMode ? "#FFFFFF" : "#373440" }}
          >
            {title}
          </Text>
          <Text
            className="text-[12px] text-black font-pregular mt-1"
            style={{ color: darkMode ? "#FFFFFF" : "#373440" }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {entry}
          </Text>
        </View>
      </View>

      {/* Date - Positioned at Top Right with Green Background */}
      <View
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "#8DDC80", // Green background
          paddingVertical: 4,
          paddingHorizontal: 10,
          borderRadius: 20,
        }}
      >
        <Text className="text-[12px] text-black font-pmedium">
          {formatDate(date)}
        </Text>
      </View>
    </View>
  );
};

export default JournalEntry;

const styles = StyleSheet.create({});
