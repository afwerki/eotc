import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Modal,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import { Video } from 'expo-av';
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TopNavScreen from "./TopNavScreen";
import Work from "./Work";

const categories = [
  { icon: "🏨", name: "ስራ/ Work" },
  { icon: "🏨", name: "ቤት ኪራይ/ Rent" },
  { icon: "🎵", name: "መዝሙር" },
  { icon: "📰", name: "የቤተክርስቲያን ዜናዎች" },
  { icon: "📚", name: "መፃህፍህት" },
  { icon: "📂", name: "Projects" },
];

const videos = [
  require('../assets/mezmure.mp4'),
  require('../assets/meskel.mp4'),
];

const HomeScreen = ({ navigation }) => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
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

  const handleOutsidePress = () => {
    setNotificationsVisible(false);
    setMenuVisible(false);
  };

  const handleIconPress = (category) => {
    if (category.name === "ስራ/ Work") {
      setActiveScreen('work');
    }
  };

  const goBack = () => {
    setActiveScreen('home');
  };

  return (
    <SafeAreaView style={styles.container}>
      {activeScreen === 'home' && (
        <>
          <TopNavScreen
            onBellPress={() => setNotificationsVisible(!notificationsVisible)}
            onMenuPress={() => setMenuVisible(true)}
          />

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
                    <TouchableOpacity key={index} style={styles.categoryCard} onPress={() => handleIconPress(category)}>
                      <View style={styles.iconContainer}>
                        <Text style={styles.icon}>{category.icon}</Text>
                      </View>
                      <Text style={styles.iconName}>{category.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.calendarContainer}>
              <View style={styles.calendarHeader}>
                <FeatherIcon name="calendar" size={30} color="#0069fe" />
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
                <FeatherIcon name="clock" size={30} color="#0069fe" />
                <Text style={styles.scheduleHeaderText}>SCHEDULE OF SERVICES/  የቤተክርስቲያን መረሃግብሮች</Text>
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
                <Text style={styles.scheduleHeaderText}>News/   የቤተክርስቲያን ዜናዎች</Text>
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
                <MaterialCommunityIcons name="frequently-asked-questions" size={30} color="#0069fe" />
                <Text style={styles.scheduleHeaderText}>Q&A/   ጥያቄ እና መልስ</Text>
              </View>
              <View style={styles.separatorLine} />
              <View style={styles.scheduleContent}>
                <Text style={styles.scheduleDateText}>August 04 Sunday</Text>
                <Text style={styles.scheduleTitle}>
                  6th Sunday after Pentecost; Holy Myrrhbearer and Equal-to-the-Apostles Mary Magdalene (1st C)
                </Text>
                <Text style={styles.scheduleTime}>Uploaded by</Text>
                <TouchableOpacity>
                  <Text style={styles.scheduleMore}>MORE...</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      )}

      {activeScreen === 'work' && <Work navigation={{ goBack }} />}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    height: 110,
    marginHorizontal: 5,
    paddingVertical: 10,
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
  iconContainer: {
    backgroundColor: "#e6f0fa",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  icon: {
    fontSize: 24,
    color: "#0069fe",
  },
  iconName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
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
    height: "75%",
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 70, // Adjust this to match the height of the top navigation
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuItem: {
    width: "45%",
    alignItems: "center",
    marginBottom: 20,
  },
  menuIcon: {
    fontSize: 40,
    color: "#0069fe",
  },
  menuItemText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#000',
  },
});

export default HomeScreen;
