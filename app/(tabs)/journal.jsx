import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { Calendar } from "react-native-calendars";

const journalEntries = [
  {
    id: 1,
    title: "Productive Day",
    date: "2/9/25",
    description:
      "Today I got everything done that I wanted to and it was super helpful... ",
    emoji: icons.happy,
    keyword1: "Motivated",
    keyword2: "Productive",
  },
];

const Journal = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Set the default selected date to today when the component mounts
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in 'YYYY-MM-DD' format
    setSelectedDate(today); // Set the default selected date
  }, []);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString); // Set the selected date
  };

  const getMarkedDates = () => {
    return {
      [selectedDate]: {
        selected: true,
        selectedColor: "#8DDC80", // Background color for the selected day
        selectedTextColor: "black", // Text color for the selected day
      },
    };
  };

  // Custom header with green background
  const renderHeader = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[date.getMonth()]; // Get the full month name
    const year = date.getFullYear(); // Get the year

    return (
      <View
        style={{
          backgroundColor: "#8DDC80",
          padding: 10,
          borderRadius: 30,
        }}
      >
        <Text
          style={{ color: "black", fontSize: 20, fontFamily: "Poppins-Bold" }}
        >
          {month} {year} {/* Display the full month and year as text */}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Logo */}
      <View className="items-center mt-2">
        <Image source={icons.logo} className="w-12 h-12" resizeMode="contain" />
      </View>

      {/* Journal Header */}
      <View className="flex-1 justify-start items-center px-2">
        <Text className="text-center text-[40px] font-psemibold mt-4">
          Journals
        </Text>

        {/* Calendar */}
        <View className="items-center">
          <Calendar
            style={{
              borderRadius: 20,
              margin: 20,
              width: 350,
            }}
            onMonthChange={() => {}}
            minDate={"2025-01-01"}
            maxDate={"2025-12-31"}
            hideExtraDays={true}
            markedDates={getMarkedDates()} // Apply marked dates here
            onDayPress={handleDayPress} // Set the selected date on day press
            theme={{
              arrowColor: "black", // Set the arrow color to black
              todayTextColor: "black", // Change the current day's text color to black
              textMonthFontFamily: "Poppins-Bold", // Apply custom font to month
              textMonthFontSize: 20,
              textDayFontFamily: "Poppins-SemiBold", // Apply custom font to day numbers
              textDayFontSize: 18,
              textDayHeaderFontFamily: "Poppins-SemiBold", // Apply custom font to day headers
              textSectionTitleColor: "black", // Set section titles (e.g., "Mon", "Tue") color to black
              calendarBackground: "white", // Set the background color of the calendar area
              backgroundColor: "white", // Set the background color of the entire calendar
              textMonthColor: "black", // Set the month text color to black
              textDayColor: "black", // Set the day text color to black
              textDayHeaderColor: "black", // Set the day header text color to black
            }}
            renderHeader={renderHeader} // Custom header with green background
          />

          {/* Journal Entries */}
          <FlatList
            data={journalEntries}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="bg-white rounded-xl p-4 flex-row items-center mt-2 shadow-sm opacity-100 relative">
                {/* Mood Image */}
                <View className="w-12 h-12 rounded-full justify-center items-center">
                  <Image
                    source={item.emoji}
                    className="w-14 h-14"
                    resizeMode="contain"
                  />
                </View>

                {/* Text Content */}
                <TouchableOpacity style={{ width: 275 }}>
                  <View className="flex-1 ml-4">
                    <Text className="text-[20px] font-psemibold">
                      {item.title}
                    </Text>
                    <Text className="text-[12px] text-gray-600 font-pmedium mt-1">
                      {item.description}
                    </Text>

                    {/* Keywords Section with Green Background for Each Keyword */}
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                      {/* First Keyword */}
                      <View
                        style={{
                          backgroundColor: "#8DDC80", // Green background for keyword
                          paddingVertical: 3,
                          paddingHorizontal: 8,
                          borderRadius: 20,
                          marginRight: 5,
                        }}
                      >
                        <Text className="text-[12px] text-black font-psemibold">
                          {item.keyword1}
                        </Text>
                      </View>

                      {/* Second Keyword */}
                      <View
                        style={{
                          backgroundColor: "#8DDC80", // Green background for keyword
                          paddingVertical: 3,
                          paddingHorizontal: 8,
                          borderRadius: 20,
                          marginRight: 5,
                        }}
                      >
                        <Text className="text-[12px] text-black font-psemibold">
                          {item.keyword2}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Date - Positioned at Top Right with Green Background */}
                <View
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 10,
                    backgroundColor: "#8DDC80", // Green background
                    paddingVertical: 3,
                    paddingHorizontal: 8,
                    borderRadius: 20,
                  }}
                >
                  <Text className="text-[12px] text-black font-pmedium">
                    {item.date}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Journal;
