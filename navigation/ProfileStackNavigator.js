import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen_simple from '../screens/ProfileScreen_simple';
import QuestionsUploadScreen from '../screens/uploading/QuestionsUploadScreen';
import MezmurUpload from '../screens/uploading/Upload_mezmur';
import Alert from '../screens/uploading/Alret';
import Segmentation from '../screens/SegmentationScreen';
import ProjectProposal from '../screens/uploading/ProjectProposal';
import Work from '../screens/uploading/Work';
import RentHouse from '../screens/uploading/RentHouse';
import QuizzingScreen from '../screens/QuizzingScreen';
import TopUsersScreen from '../screens/TopUsersScreen';
const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen_simple}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuestionsUpload"
        component={QuizzingScreen}
        options={{ title: 'Upload Questions' }}
      />
      <Stack.Screen
        name="MezmurUpload"
        component={MezmurUpload}
        options={{ title: 'Upload mezmur' }}
      />
      <Stack.Screen
        name="Alert"
        component={Alert}
        options={{ title: 'Alert' }}
      />
      <Stack.Screen
        name="Segmentation"
        component={Segmentation}
        options={{ title: 'Segmentation' }}
      />
      <Stack.Screen
        name="ProjectProposal"
        component={ProjectProposal}
        options={{ title: 'Project Proposal'}}
      />
      <Stack.Screen
        name="Work"
        component={Work}
        options={{ title: 'Work'}}
      />
      <Stack.Screen
        name="RentHouse"
        component={RentHouse }
        options={{ title: 'Rent house'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
