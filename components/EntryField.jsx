import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";

const EntryField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode } = useGlobalContext();

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text
        className={`text-base font-psemibold ${
          darkMode ? "text-white" : "text-[#373440]"
        }`}
      >
        {title}
      </Text>

      <View
        className="w-full px-4 bg-white rounded-3xl border-[#8DDC80] flex-1 text-[#373440] font-pmedium text-base"
        style={{
          minHeight: 200,
          backgroundColor: darkMode ? "#373440" : "#FFFFFF",
          borderWidth: 3,
        }}
      >
        <TextInput
          className="flex-1 text-[#373440] font-pmedium text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={darkMode ? "#FFFFFF" : "#373440"}
          onChangeText={handleChangeText}
          multiline={true}
          textAlignVertical="top"
          numberOfLines={8}
          style={{
            minHeight: 150,
            paddingTop: 12,
            color: darkMode ? "#FFFFFF" : "#373440",
          }}
          secureTextEntry={title === "Password" && !showPassword}
        />
      </View>
    </View>
  );
};

export default EntryField;
