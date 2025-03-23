import { Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const CreateLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="create"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="read"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default CreateLayout;
