import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode, setDarkMode } = useGlobalContext();

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
        className="w-full h-14 px-4 bg-white rounded-3xl focus:border-green-900 items-center flex-row border-[#8DDC80]"
        style={{
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
          style={{ color: darkMode ? "#FFFFFF" : "#373440" }}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyehide}
              className="w-7 h-7"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
