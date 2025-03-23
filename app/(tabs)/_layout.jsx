import { Text, View, Image } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";

const TabIcon = ({ icon, color, name, focused }) => (
  <View className="items-center justify-center gap-1">
    <Image
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className="w-6 h-6"
    />
    <Text
      className={focused ? "font-psemibold" : "font-pregular"}
      style={{ color }}
    >
      {name}
    </Text>
  </View>
);

const TabsLayout = () => {
  const { darkMode } = useGlobalContext(); // Get dark mode state

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: darkMode ? "#8DDC80" : "#83AA5D",
        tabBarInactiveTintColor: "#757575",
        tabBarStyle: {
          backgroundColor: darkMode ? "#373440" : "#ffffff",
          borderTopColor: darkMode ? "#333333" : "#cccccc",
          borderTopWidth: 1,
          height: 100,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.plus}
              color={color}
              name="Journal"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
