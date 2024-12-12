import { Text, View, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center items-center px-4 my-6 mt-1">
          <Image
            source={images.logo}
            className="w-[125px] h-[85px] relative top-[-10px]"
            resizeMode="contain"
          />

          <Text className="text-[32px] text-semibold font-psemibold">
            Create an Account
          </Text>

          <Text className="text-center text-[#373440] mt-2 text-[18px]">
            Please fill out the fields below to{"\n"}create an account with us
          </Text>

          <FormField
            title="Name"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-7 w-[325px]"
            placeholder="Name"
          />

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
            placeholder="Password"
          />

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
              className="text-lg text-[#557f2b] font-psemibold"
            >
              <Text style={{ textDecorationLine: "underline" }}>Sign In</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
