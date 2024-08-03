import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import { FontAwesome5, MaterialCommunityIcons, Octicons, Feather } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import BooksScreen from '../screens/BooksScreen';
import MezmurScreen from '../screens/MezmurScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import ProfileStackNavigator from './ProfileStackNavigator'; // Import the Profile Stack Navigator

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          title: 'ቤተክርስቲያን',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Books"
        component={BooksScreen} // Assuming NewsScreen is temporarily used for this example
        options={{
          tabBarLabel: 'Books',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="bible" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Mezmur"
        component={MezmurScreen}
        options={{
          tabBarLabel: 'መዝሙሮች',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="cross" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarLabel: 'News',
          title: 'የቤተክርስቲያን ዜናዎች',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="newspaper-variant-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{
          tabBarLabel: 'Project',
          tabBarIcon: ({ color, size }) => <Octicons name="project" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator} // Use the Profile Stack Navigator
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color, size }) => <Feather name="settings" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
