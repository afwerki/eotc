import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RentHouse from '../screens/RentHouse';
import Work from '../screens/Work';
import MezmurUpload from '../screens/MezmurScreen';
import NewsScreen from '../screens/NewsScreen';
import Segmentation from '../screens/SegmentationScreen';
import ProjectProposal from '../screens/uploading/ProjectProposal';
import Quizzing from '../screens/QuizzingScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RentStack"
        component={RentHouse}
        options={{ title: 'Rent House' }}
      />
      <Stack.Screen
        name="WorkStack"
        component={Work}
        options={{ title: 'Work' }}
      />
       <Stack.Screen
        name="Quizzing"
        component={Quizzing}
        options={{ title: 'Questions and answers' }}
      />
      <Stack.Screen
        name="MezmurStack"
        component={MezmurUpload}
        options={{ title: 'Upload Mezmur' }}
      />
      <Stack.Screen
        name="NewsStack"
        component={NewsScreen}
        options={{ title: '  የቤተክርስቲያን ዜናዎች' }}
      />
      <Stack.Screen
        name="BooksStack"
        component={Segmentation}
        options={{ title: 'Books' }}
      />
      <Stack.Screen
        name="ProjectsStack"
        component={ProjectProposal}
        options={{ title: 'Projects' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
