import { TouchableOpacity, Text } from "react-native";
import React from "react";

const LogInButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-[#000000] rounded-3xl min-h-[62px] justify-center items-center w-full ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-[#FFFFFF] font-pbold text-[18px] ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default LogInButton;
