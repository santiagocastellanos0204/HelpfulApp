import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import JournalEntry from "../../components/JournalEntry";
import { getAllEntries } from "@/lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import * as LocalAuthentication from "expo-local-authentication";

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
  const [locked, setLocked] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleUnlock = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const supportedTypes =
      await LocalAuthentication.supportedAuthenticationTypesAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Unlock your Journal",
        fallbackLabel: "Enter Passcode",
      });

      if (result.success) {
        setLocked(false);
      } else {
        alert("Authentication failed!");
      }
    } else {
      alert("Biometric authentication not available");
    }
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
      <Text
        className={`text-center text-[30px] font-psemibold mt-1 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        My Journals
      </Text>
      <Text></Text>

      {locked ? (
        // 🔒 Locked Screen
        <View className="justify-center items-center px-4 mt-36">
          {/* Title and Lock in a Row */}
          <View className="flex-row items-center mb-6">
            <Text
              className={`text-3xl font-psemibold text-center text-black mr-1 ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Journal Locked
            </Text>
            <Image
              source={darkMode ? icons.whitelock : icons.lock}
              className="w-10 h-10 -mt-2"
              resizeMode="contain"
            />
          </View>

          {/* Unlock Button */}
          <TouchableOpacity
            onPress={handleUnlock}
            className="px-6 py-3 rounded-2xl mt-2"
            style={{ backgroundColor: "#8DDC80" }}
          >
            <Text className="text-black text-lg font-psemibold">
              View Journals
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* 🔒 Lock Button */}
          <View className="flex-row justify-end px-4 -mt-16">
            <TouchableOpacity
              onPress={() => setLocked(true)}
              className="px-4 py-2 rounded-2xl -mt-2"
            >
              <Image
                source={darkMode ? icons.whiteunlock : icons.unlock}
                className="w-12 h-12"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View className="flex-1 justify-start items-center px-2">
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
        </>
      )}
    </SafeAreaView>
  );
};

export default Journal;
