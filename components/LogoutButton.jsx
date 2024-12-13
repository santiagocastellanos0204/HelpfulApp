import React from "react";
import { View, Button, Alert, StyleSheet } from "react-native";
import { logoutManually } from "../lib/appwrite";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logoutManually();
      Alert.alert("Success", "You have been logged out.");
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
      console.error("Error during logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} color="#FF6F61" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LogoutButton;
