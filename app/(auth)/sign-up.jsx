import {
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

// Register page for a user to create an account
const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.name === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await createUser(form.email, form.password, form.name);

      router.replace("/sign-in");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 2 }}>
          <View className="w-full justify-center items-center px-4 my-6 mt-1">
            <Link href="/" style={{ position: "absolute", top: 20, left: 20 }}>
              <Image
                source={images.backArrow}
                style={{ width: 40, height: 40 }} // Adjust the size as needed
                resizeMode="contain"
              />
            </Link>

            <Image
              source={icons.logo}
              className="w-12 h-12"
              resizeMode="contain"
            />
            <Text className="text-[32px] text-semibold font-psemibold mt-8">
              Create an Account
            </Text>

            <Text className="text-center text-[#373440] mt-2 text-[16px] font-pmedium">
              Please fill out the fields below to{"\n"}create an account with us
            </Text>

            <View style={{ flex: 2, justifyContent: "center" }}>
              <FormField
                title="Name"
                value={form.name}
                handleChangeText={(e) => setForm({ ...form, name: e })}
                otherStyles="mt-7"
                placeholder="Name"
              />

              <FormField
                title="Email"
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyles="mt-7 w-full"
                keyboardType="email-address"
                placeholder="Email"
              />

              <FormField
                title="Password"
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles="mt-7"
                placeholder="Password"
              />
            </View>

            <CustomButton
              title="Create Account"
              handlePress={submit}
              containerStyles="mt-9"
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-[#373440] font-pmedium">
                Already have an account?
              </Text>
              <Link
                href="/sign-in"
                className="text-lg text-[#000000] font-psemibold"
              >
                <Text style={{ textDecorationLine: "underline" }}>Sign In</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
