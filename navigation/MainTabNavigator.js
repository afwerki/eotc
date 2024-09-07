import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import { FontAwesome5, MaterialCommunityIcons, Octicons, Feather } from '@expo/vector-icons';
import { useAuth } from '../screens/context/AuthContext';

import HomeStackNavigator from './HomeStackNavigator'; // Import the HomeStackNavigator
import NewsScreen from '../screens/NewsScreen';
import BooksScreen from '../screens/BooksScreen';
import MezmurScreen from '../screens/MezmurScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import ProfileStackNavigator from './ProfileStackNavigator';
import AdminDashboard from '../screens/AdminDashboard';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { role } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator} // Replace HomeScreen with HomeStackNavigator
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Mezmur"
        component={MezmurScreen}
        options={{
          tabBarLabel: 'Mezmur',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="music" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="newspaper-variant-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
        }}
      />
      {role === 'admin' && (
        <Tab.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{
            tabBarLabel: 'Admin',
            tabBarIcon: ({ color, size }) => <FontAwesome5 name="user-shield" color={color} size={size} />,
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
