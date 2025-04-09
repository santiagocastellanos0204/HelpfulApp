import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import EntryField from "../../components/EntryField";
import CustomButton from "../../components/CustomButton";
import { images } from "../../constants";
import { router, useRouter } from "expo-router";
import { createEntry } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

// Format Date Function
const getFormattedDate = () => {
  const date = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

// Create page where users can create a mood entry
const Create = () => {
  const { user } = useGlobalContext();
  const searchParams = useLocalSearchParams();
  const moodId = searchParams.moodId;
  const { darkMode } = useGlobalContext();

  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    mood: null,
    title: "",
    entry: "",
    date: getFormattedDate(),
  });
  const [selectedMood, setSelectedMood] = useState(null); // For mood selection

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

  useEffect(() => {
    if (moodId) {
      const mood = moods.find((mood) => mood.id === parseInt(moodId));
      if (mood) {
        setSelectedMood(mood);
        setForm((prevForm) => ({
          ...prevForm,
          mood: mood.emoji, // Store the emoji URL in form state
        }));
      }
    }
  }, [moodId]);

  const submit = async () => {
    if (!form.mood || !form.title || !form.entry || !form.date) {
      return Alert.alert("Please fill in all the fields");
    }

    setUploading(true);

    try {
      await createEntry({
        ...form,
        userId: user.$id,
        mood: form.mood,
      });

      Alert.alert("Success", "Entry uploaded successfully");
      router.push("../(tabs)/journal");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        mood: null,
        title: "",
        entry: "",
        date: getFormattedDate(),
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView
      className={`flex-1 ${darkMode ? "bg-[#22222c]" : "bg-[#ececec]"}`}
    >
      <ScrollView className="px-4 mt-6">
        <Text
          className={`text-center text-[16px] font-pregular mt-4 ${
            darkMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {getFormattedDate()}
        </Text>

        {/* Back Button in Top-Left */}
        <TouchableOpacity
          className="justify-center items-center absolute left-1"
          onPress={() => router.push("/(tabs)/home")}
          style={{ top: 10 }}
        >
          <Image
            source={darkMode ? images.whiteBackArrow : images.backArrow}
            style={{ width: 40, height: 40 }}
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

        {/* Render the selected mood emoji only if it's available */}
        {selectedMood && (
          <View className="justify-center items-center mt-4">
            <Image
              source={{ uri: selectedMood.emoji }} // Display the selected mood emoji
              className="w-20 h-20"
              resizeMode="contain"
              value={form.mood}
            />
          </View>
        )}

        {/* Form Fields */}
        <FormField
          title="Title"
          value={form.title}
          placeholder="Title for this entry..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-4"
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <EntryField
            title="Journal Entry"
            value={form.entry}
            placeholder="Write how you are feeling..."
            handleChangeText={(e) => setForm({ ...form, entry: e })}
            otherStyles="mt-4"
          />
        </KeyboardAvoidingView>

        <View className="mt-7 space-y-2">
          <CustomButton
            title="Add Mood Entry"
            handlePress={submit}
            isLoading={uploading}
          ></CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
