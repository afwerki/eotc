import React, { useState, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  Pressable,
  Modal,
  Dimensions,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const categories = [
  { icon: "🏨", name: "ቤት ኪራይ" },
  { icon: "🎵", name: "መዝሙር" },
  { icon: "📰", name: "የቤተክርስቲያን ዜናዎች" },
  { icon: "📚", name: "መፃህፍህት" },
  { icon: "📂", name: "Projects" },
  { icon: "👤", name: "ሹፍርና" },
];

const features = [
  { icon: "🏨", name: "Send prayer note", content: "This is where you can send a prayer note." },
  { icon: "🏨", name: "Church relics", content: "Information about church relics." },
  { icon: "📅", name: "Calendar", content: "Calendar details including important dates." },
  { icon: "🕒", name: "Schedule of Services", content: "Details about the schedule of services." },
  { icon: "📰", name: "News", content: "Latest news and announcements." },
  { icon: "❓", name: "Quiz", content: "Interactive quiz for church members." },
];

const images = [
  { src: require("../assets/Priests.png"), text: " አንድነታችንን አጠናከረን፣ እንደ አንድ አፍ ተናጋሪ አንደአልብ መርማሪ እንሆናለ።" },
  { src: require("../assets/church_with_candles.jpeg"), text: "እንደአንድ ህዝብ እርስ በእርስ ተሳሰበን ከውስጣችን የበቀሉ ስዎችን ለበለጠ ስኬት እንዲበቁ እናረጋለን።" },
  { src: require("../assets/catedral_outside.jpeg"), text: "ምንጫው የማይትወቁ ዜናዎች እናስወግዳለን" },
];

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState({ icon: "", name: "", content: "" });
  const carouselRef = useRef(null);

  const handleIconPress = (feature) => {
    setSelectedFeature(feature);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../assets/eotc.jpeg")}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>Ethiopian Orthodox Church</Text>
          <View style={styles.headerIcons}>
            <FeatherIcon name="bell" size={24} color="white" style={styles.bellIcon} />
            <FeatherIcon name="menu" size={24} color="white" />
          </View>
        </View>

      <ScrollView>

        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryCard} onPress={() => handleIconPress(category)}>
              <Text style={styles.icon}>{category.icon}</Text>
              <Text style={styles.iconName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
       
        <View style={styles.newsContainer}>
          {features.map((feature, index) => (
            <TouchableOpacity key={index} style={styles.newsCard} onPress={() => handleIconPress(feature)}>
              <Text style={styles.newsTitle}>{feature.name}</Text>
              <Text style={styles.newsContent}>{feature.content}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{selectedFeature.icon} {selectedFeature.name}</Text>
            <Text style={styles.modalDescription}>{selectedFeature.content}</Text>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0e8df",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#5D3FD3", // Changed color to a deep purple
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white", // Changed text color to white
  },
  headerIcons: {
    flexDirection: "row",
  },
  bellIcon: {
    marginRight: 15,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  categoryCard: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    margin: "1.66%",
    paddingVertical: 20,
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
  icon: {
    fontSize: 30,
    color: "#f48c42",
  },
  iconName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  imageSlider: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselItem: {
    position: "relative",
  },
  carouselImage: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  carouselOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  carouselText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
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
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;