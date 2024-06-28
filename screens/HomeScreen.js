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
  const [menuVisible, setMenuVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const carouselRef = useRef(null);

  const handleIconPress = (feature) => {
    setSelectedFeature(feature);
    setModalVisible(true);
  };

  const handleOutsidePress = () => {
    setNotificationsVisible(false);
    setMenuVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/eotc.jpeg")} style={styles.logo} />
        <Text style={styles.headerTitle}>Ethiopian Orthodox Church</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => setNotificationsVisible(!notificationsVisible)}>
            <FeatherIcon name="bell" size={24} color="white" style={styles.bellIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <FeatherIcon name="menu" size={24} color="white" />
          </TouchableOpacity>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={handleOutsidePress}
      >
        <TouchableOpacity style={styles.menuOverlay} activeOpacity={1} onPress={handleOutsidePress}>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Menu</Text>
            {categories.map((category, index) => (
              <Text key={index} style={styles.menuItem}>{category.icon} {category.name}</Text>
            ))}
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setMenuVisible(false)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={notificationsVisible}
        onRequestClose={handleOutsidePress}
      >
        <TouchableOpacity style={styles.notificationOverlay} activeOpacity={1} onPress={handleOutsidePress}>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>Notifications</Text>
            <Text style={styles.notificationItem}>Notification 1</Text>
            <Text style={styles.notificationItem}>Notification 2</Text>
            <Text style={styles.notificationItem}>Notification 3</Text>
          </View>
        </TouchableOpacity>
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
    backgroundColor: "#5D3FD3",
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
    color: "white",
  },
  headerIcons: {
    flexDirection: "row",
  },
  bellIcon: {
    marginRight: 15,
  },
  notificationsDropdown: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 1,
  },
  notificationOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  menuOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContent: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 10,
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
