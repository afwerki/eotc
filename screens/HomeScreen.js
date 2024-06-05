import React from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import FeatherIcon from "react-native-vector-icons/Feather";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    <View style={styles.header}>
    <Image
      source = {require("../assets/eotc.jpeg")}
      style = {styles.logo}
    />
    <Text style ={styles.headerText}>Ethiopian orthodox church</Text>
    <View style = {styles.headerIcon}>
    <FeatherIcon
    name = "bell"
    size={24}
    color="white"
    style = {styles.belIcon}
    />
    <FeatherIcon name="menu" size={24} color="white"/>

    </View>

    </View>
      
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:1,
    borderBlockColor:'#ddd'

  },
  logo:{
    width:40,
    height:40,
    resizeMode:'contain'

  },
  headerTitle:{
    fontSize:18,
    fontWeight:'bold',
    color:'white',

  },
  headerIcons:{
    flexDirection:'row',

  },
  bellIcon:{
    marginRight:15,

  },

});

export default HomeScreen;
