import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text, Modal, TouchableWithoutFeedback } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TopNavScreen = ({ onBellPress, onMenuPress, menuVisible, setMenuVisible }) => {
  const insets = useSafeAreaInsets();

  const handleMenuPress = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <Image source={require("../assets/eotc.jpeg")} style={styles.logo} />
      <Text style={styles.headerTitle}>ተዋህዶ / EOTC</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={onBellPress}>
          <Feather name="bell" size={20} color="white" style={styles.bellIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMenuPress}>
          <Feather name="menu" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.menuOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.menuContent}>
                <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
                  <Text style={styles.menuItemText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
                  <Text style={styles.menuItemText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
                  <Text style={styles.menuItemText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
                  <Text style={styles.menuItemText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,  // Reduced padding to make the nav smaller
    backgroundColor: "#0069fe",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    width: 30, // Reduced size of the logo
    height: 30,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 16, // Reduced font size
    fontWeight: "bold",
    color: "white",
  },
  headerIcons: {
    flexDirection: "row",
  },
  bellIcon: {
    marginRight: 10, // Reduced margin
  },
  menuOverlay: {
    flex: 1,
    justifyContent: "flex-end", // Aligns the menu at the bottom
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContent: {
    width: "100%", // Full width of the screen
    height: "80%", // Adjust height to not cover the bottom tabs
    backgroundColor: "#fff",
    paddingTop: 20, // Start the menu content a bit lower
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  menuItem: {
    paddingVertical: 20,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  menuItemText: {
    fontSize: 18,
    color: "#333",
  },
});

export default TopNavScreen;
