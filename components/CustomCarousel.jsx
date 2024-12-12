import React, { useRef, useState } from "react";
import {
  FlatList,
  Dimensions,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { images } from "../constants";

const CustomCarousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % data.length;
    const nextItemOffset = Dimensions.get("window").width * nextIndex;
    flatListRef?.current?.scrollToOffset({
      animated: true,
      offset: nextItemOffset,
    });
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + data.length) % data.length;
    const prevItemOffset = Dimensions.get("window").width * prevIndex;
    flatListRef?.current?.scrollToOffset({
      animated: true,
      offset: prevItemOffset,
    });
    setCurrentIndex(prevIndex);
  };

  const renderItems = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item} style={styles.image} resizeMode="contain" />
    </View>
  );

  return (
    <View style={styles.carouselContainer}>
      <TouchableOpacity style={styles.arrowLeft} onPress={handlePrev}>
        {/* <Text style={styles.arrowText}>{"<"}</Text> */}
        <Image source={images.leftArrow} />
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItems}
        contentContainerStyle={styles.flatListContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        snapToInterval={Dimensions.get("window").width}
        decelerationRate="normal"
      />
      <TouchableOpacity style={styles.arrowRight} onPress={handleNext}>
        {/* <Text style={styles.arrowText}>{">"}</Text> */}
        <Image source={images.rightArrow} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatListContainer: {
    // Add styling for the container if needed
  },
  carouselItem: {
    width: Dimensions.get("window").width,
    padding: 10,
    // Customize item styling as needed
  },
  image: {
    width: "100%",
    height: "100%",
  },
  arrowLeft: {
    position: "absolute",
    left: 20,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    padding: 10,
    borderRadius: 20,
  },
  arrowRight: {
    position: "absolute",
    right: 40,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    padding: 10,
    borderRadius: 20,
  },
  arrowText: {
    color: "#fff",
    fontSize: 15,
  },
});

export default CustomCarousel;
