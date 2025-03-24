import { useLocalSearchParams, router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { getEntryById, updateEntry, deleteEntry } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import EntryField from "../../components/EntryField";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";

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
const getFormattedDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: "long", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

// Read, Update and Delete page for mood entry
const Read = () => {
  const searchParams = useLocalSearchParams();
  const entryId = searchParams.entryId;
  const { darkMode, setDarkMode } = useGlobalContext();

  const { data: entry, refetch } = useAppwrite(() => getEntryById(entryId));

  const [form, setForm] = useState({
    mood: null,
    title: "",
    entry: "",
    date: "",
  });

  useEffect(() => {
    if (entry) {
      setForm({
        mood: entry.mood,
        title: entry.title,
        entry: entry.entry,
        date: entry.date,
      });
    }
  }, [entry]);

  const handleUpdate = async () => {
    try {
      if (!form.mood || !form.title || !form.entry || !form.date) {
        return Alert.alert("Please fill in all the fields");
      } else {
        await updateEntry(entryId, form);
        Alert.alert("Success", "Journal entry updated successfully");
        router.push("/(tabs)/journal");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update journal entry");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEntry(entryId);
      Alert.alert("Success", "Journal entry deleted successfully");
      router.push("/(tabs)/journal");
    } catch (error) {
      Alert.alert("Error", "Failed to delete journal entry");
    }
  };

  const selectedMood = moods.find((mood) => mood.emoji === form.mood);

  // UI
  return (
    <SafeAreaView
      className={`flex-1 ${darkMode ? "bg-[#22222c]" : "bg-[#ececec]}"}`}
    >
      <ScrollView className="px-4 mt-6">
        <Text
          className={`text-center text-[16px] font-pregular mt-4 ${
            darkMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {getFormattedDate(form.date)}
        </Text>

        {/* Back Button in Top-Left */}
        <TouchableOpacity
          className="justify-center items-center absolute left-1"
          onPress={() => router.push("/(tabs)/journal")}
          style={{ top: 10 }}
        >
          <Image
            source={darkMode ? images.whiteBackArrow : images.backArrow}
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Delete Button in Top-Right */}
        <TouchableOpacity
          className="justify-center items-center absolute right-1"
          onPress={handleDelete}
          style={{ top: 15 }}
        >
          <Image
            source={images.trash}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text
          className={`text-[28px] text-black font-psemibold justify-center items-center text-center ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Mood Entry
        </Text>

        {/* Display Mood Image */}
        {selectedMood && (
          <View className="justify-center items-center mt-4">
            <Image
              source={{ uri: selectedMood.emoji }}
              className="w-20 h-20"
              resizeMode="contain"
            />
          </View>
        )}

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <FormField
            title="Title"
            placeholder="Title for this entry..."
            value={form.title}
            handleChangeText={(text) => setForm({ ...form, title: text })}
            otherStyles="mt-4"
          />
          <EntryField
            title="Journal Entry"
            placeholder="Write your journal entry..."
            multiline={true}
            numberOfLines={8}
            textAlignVertical="top"
            value={form.entry}
            handleChangeText={(text) => setForm({ ...form, entry: text })}
            otherStyles="mt-4"
          />

          <View className="mt-7 space-y-2">
            <CustomButton
              title="Save"
              handlePress={handleUpdate}
            ></CustomButton>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Read;
