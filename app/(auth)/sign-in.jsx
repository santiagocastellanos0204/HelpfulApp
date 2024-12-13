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
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

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
    <SafeAreaView style={{ flex: 1 }} className="bg-primary h-full">
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
              source={images.logo}
              className="w-[125px] h-[85px] relative top-[-10px]"
              resizeMode="contain"
            />

            <Text className="text-[36px] text-semibold font-psemibold">
              Log In
            </Text>

            <Text className="text-center text-[#373440] mt-2 text-[18px]">
              We are glad to have you back{"\n"}Please enter your credentials
              {"\n"}
            </Text>

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7 w-[325px]"
              keyboardType="email-address"
              placeholder="Email"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7 w-[325px]"
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
                className="text-lg text-[#557f2b] font-psemibold"
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
