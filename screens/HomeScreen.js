import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, ScrollView, Text, TouchableOpacity, Dimensions, Animated, Image } from "react-native";
import { Video } from 'expo-av';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const categories = [
  { icon: "🏨", name: "ስራ/ Work", route: "WorkStack", count: 10 },
  { icon: "🏠", name: "ቤት ኪራይ/ Rent", route: "RentStack", count: 5 },
  { icon: "🎵", name: "መዝሙር", route: "MezmurStack", count: 7 },
  { icon: "📰", name: "የቤተክርስቲያን ዜናዎች", route: "NewsStack", count: 8 },
  { icon: "📚", name: "መፃህፍህት", route: "BooksStack", count: 12 },
  { icon: "📂", name: "Projects", route: "ProjectsStack", count: 3 },
];

const videos = [
  require('../assets/mezmure.mp4'),
  require('../assets/meskel.mp4'),
];

const HomeScreen = ({ navigation }) => {
  const carouselRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let position = 0;
    const interval = setInterval(() => {
      if (carouselRef.current) {
        position = (position + 1) % videos.length;
        carouselRef.current.scrollTo({ x: position * Dimensions.get('window').width, animated: true });
      }
    }, 12000);
    return () => clearInterval(interval);
  }, [carouselRef]);

  const handleIconPress = (route) => {
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageSliderContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={carouselRef}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          >
            {videos.map((videoUri, index) => (
              <Video
                key={index}
                source={typeof videoUri === 'string' ? { uri: videoUri } : videoUri}
                style={styles.sliderImage}
                resizeMode="cover"
                isLooping
                shouldPlay
                isMuted={true}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.iconsScrollContainer}>
          <Text style={styles.sectionTitle}>እዚህ አፕ ላይ የሚገኙ ጥቅሞች</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
              {categories.map((category, index) => (
                <TouchableOpacity key={index} style={styles.categoryCard} onPress={() => handleIconPress(category.route)}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{category.icon}</Text>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{category.count}</Text>
                    </View>
                  </View>
                  <Text style={styles.iconName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.scheduleContainer}>
          <View style={styles.scheduleHeader}>
            <MaterialCommunityIcons name="frequently-asked-questions" size={30} color="#0069fe" />
            <Text style={styles.scheduleHeaderText}>Q&A/ ጥያቄ እና መልስ</Text>
          </View>
          <View style={styles.separatorLine} />
          <View style={styles.scheduleContent}>
            <Text style={styles.scheduleDateText}>August 04 Sunday</Text>
            <Text style={styles.scheduleTitle}>
              6th Sunday after Pentecost; Holy Myrrhbearer and Equal-to-the-Apostles Mary Magdalene (1st C)
            </Text>
            <Text style={styles.scheduleTime}>Uploaded by</Text>
            <TouchableOpacity onPress={() => navigation.navigate('QuizzingScreen')}>
              <Text style={styles.scheduleMore}>MORE...</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <Feather name="calendar" size={30} color="#0069fe" />
            <Text style={styles.calendarHeaderText}>በአላት እና አፅዋማት</Text>
            <Text style={styles.calendarDate}>8/3/2024</Text>
          </View>
          <View style={styles.calendarContent}>
            <Text style={styles.calendarDateText}>Saturday, August 3, 2024</Text>
            <Text style={styles.calendarTitle}>Week 6 after Pentecost</Text>
            <View style={styles.calendarFastingContainer}>
              <Image source={require("../assets/Orthodox_pr.png")} style={styles.fastingIcon} />
              <Text style={styles.fastingText}>No fast</Text>
            </View>
          </View>
        </View>

        <View style={styles.scheduleContainer}>
          <View style={styles.scheduleHeader}>
            <Feather name="clock" size={30} color="#0069fe" />
            <Text style={styles.scheduleHeaderText}>SCHEDULE OF SERVICES/ የቤተክርስቲያን መረሃግብሮች</Text>
          </View>
          <View style={styles.separatorLine} />
          <View style={styles.scheduleContent}>
            <Text style={styles.scheduleDateText}>August 04 Sunday</Text>
            <Text style={styles.scheduleTitle}>
              6th Sunday after Pentecost; Holy Myrrhbearer and Equal-to-the-Apostles Mary Magdalene (1st C)
            </Text>
            <Text style={styles.scheduleTime}>10:00 — Divine Liturgy</Text>
            <TouchableOpacity>
              <Text style={styles.scheduleMore}>MORE...</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.scheduleContainer}>
          <View style={styles.scheduleHeader}>
            <FontAwesome5 name="newspaper" size={30} color="#0069fe" />
            <Text style={styles.scheduleHeaderText}>News/ የቤተክርስቲያን ዜናዎች</Text>
          </View>
          <View style={styles.separatorLine} />
          <View style={styles.scheduleContent}>
            <Text style={styles.scheduleDateText}>August 04 Sunday</Text>
            <Text style={styles.scheduleTitle}>
              6th Sunday after Pentecost; Holy Myrrhbearer and Equal-to-the-Apostles Mary Magdalene (1st C)
            </Text>
            <Text style={styles.scheduleTime}>10:00 — Divine Liturgy</Text>
            <TouchableOpacity onPress={() => navigation.navigate('NewsScreen')}>
              <Text style={styles.scheduleMore}>MORE...</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f0fa",
  },
  imageSliderContainer: {
    height: 200,
  },
  imageSlider: {
    width: Dimensions.get('window').width,
  },
  sliderImage: {
    width: Dimensions.get('window').width,
    height: '100%',
    resizeMode: 'cover',
  },
  iconsScrollContainer: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  categoryCard: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#e6f0fa",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    fontSize: 28,
  },
  badge: {
    position: 'absolute',
    top: -2,  // Adjusted to position the badge better
    right: 10, // Adjusted to position the badge better
    backgroundColor: 'red',
    borderRadius: 12, // Adjusted to match the new badge size
    paddingHorizontal: 8, // Increased padding for a bigger badge
    paddingVertical: 4,  // Added vertical padding for a larger badge
  },
  badgeText: {
    color: 'white',
    fontSize: 12, // Increased font size for better visibility
    fontWeight: 'bold', // Added boldness to make the text stand out
  },
  iconName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    width: 70,
  },
  calendarContainer: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  calendarHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  calendarDate: {
    fontSize: 14,
    color: "#666",
  },
  calendarContent: {
    marginTop: 10,
  },
  calendarDateText: {
    fontSize: 14,
    color: "#333",
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  calendarFastingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fastingIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  fastingText: {
    fontSize: 14,
    color: "#666",
  },
  scheduleContainer: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scheduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  separatorLine: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  scheduleHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 5,
  },
  scheduleContent: {
    marginTop: 10,
  },
  scheduleDateText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  scheduleTime: {
    fontSize: 14,
    color: "#f00",
    marginBottom: 10,
  },
  scheduleMore: {
    fontSize: 14,
    color: "#0069fe",
    textAlign: "right",
  },
  newsContainer: {
    padding: 10,
  },
  newsCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  newsContent: {
    fontSize: 14,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#0069fe",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  menuOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContent: {
    width: "75%",
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 70, // Adjust this to match the height of the top navigation
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
  },
  notificationContent: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notificationItem: {
    fontSize: 16,
    paddingVertical: 10,
  },
});

export default HomeScreen;
