import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import JournalEntry from "../../components/JournalEntry";
import { getAllEntries } from "@/lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

// Format Date Function
const getFormattedDate = () => {
  const date = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

// Journal Page of the application displaying entries
const Journal = () => {
  const router = useRouter();
  const { data: entries, refetch } = useAppwrite(getAllEntries);
  const { darkMode, setDarkMode } = useGlobalContext();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView
      className={`flex-1 ${darkMode ? "bg-[#22222c]" : "bg-[#ececec]"}`}
    >
      {/* Logo */}
      <View className="items-center mt-2">
        <Image
          source={darkMode ? icons.whitelogo : icons.logo}
          className="w-12 h-12"
          resizeMode="contain"
        />
      </View>

      {/* Date */}
      <Text
        className={`text-center text-[16px] font-pmedium mt-4 ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {getFormattedDate()}
      </Text>

      {/* Journal Header */}
      <View className="flex-1 justify-start items-center px-2">
        <Text
          className={`text-center text-[30px] font-psemibold mt-1 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          My Journals
        </Text>
        <Text></Text>
        {/* Journal Entries */}
        <FlatList
          data={entries}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                router.push(`../(crud)/read?entryId=${item.$id}`);
              }}
            >
              <JournalEntry entry={item} />
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Journal;
