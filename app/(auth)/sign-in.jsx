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
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

// Sign in page for a user to log in
const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all the fields");
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full justify-center items-center px-4 my-6 mt-1">
            <Link href="/" style={{ position: "absolute", top: 20, left: 20 }}>
              <Image
                source={images.backArrow}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </Link>
            <Image
              source={icons.logo}
              className="w-12 h-12"
              resizeMode="contain"
            />

            <Text className="text-[36px] text-semibold font-psemibold mt-8">
              Log In
            </Text>

            <Text className="text-center text-[#373440] mt-2 text-[16px] font-pmedium">
              We are glad to have you back{"\n"}Please enter your credentials
              {"\n"}
            </Text>

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-4"
              keyboardType="email-address"
              placeholder="Email"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
              secureTextEntry
              placeholder="Password"
            />

            <CustomButton
              title="Log In"
              handlePress={submit}
              containerStyles="mt-9"
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-[#373440] font-pmedium">
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg text-[#000000] font-psemibold"
              >
                <Text style={{ textDecorationLine: "underline" }}>Sign Up</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
