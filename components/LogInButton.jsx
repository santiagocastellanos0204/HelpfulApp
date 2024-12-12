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
      style={{ width: 300 }}
      className={`bg-[#FFFFFF] rounded-3xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-[#6d8f4b] font-pbold text-[18px] ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default LogInButton;
