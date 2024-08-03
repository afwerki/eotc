import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const TopNavScreen = ({ onBellPress, onMenuPress }) => {
  return (
    <View style={styles.header}>
      <Image source={require("../assets/eotc.jpeg")} style={styles.logo} />
      <Text style={styles.headerTitle}>ተዋህዶ / EOTC</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={onBellPress}>
          <FeatherIcon name="bell" size={24} color="white" style={styles.bellIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onMenuPress}>
          <FeatherIcon name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#0069fe",
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
});

export default TopNavScreen;
