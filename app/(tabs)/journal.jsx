import { Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../../constants";

const Journal = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="items-center mt-2">
        <Image source={icons.logo} className="w-12 h-12" resizeMode="contain" />
      </View>
      <View className="flex-1 justify-start items-center px-2">
        <Text className="text-center text-[40px] font-psemibold mt-4">
          Journals
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default Journal;
