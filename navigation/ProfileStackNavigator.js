import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen_simple from '../screens/ProfileScreen_simple';
import QuestionsUploadScreen from '../screens/uploading/QuestionsUploadScreen';
import Alert from '../screens/uploading/Alret';
import learning from '../screens/uploading/Learning';
import ProjectProposal from '../screens/uploading/ProjectProposal';
import Work from '../screens/uploading/Work';
import RentHouse from '../screens/uploading/RentHouse';
import QuizzingScreen from '../screens/QuizzingScreen';

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
        name="Alert"
        component={Alert}
        options={{ title: 'Alert' }}
      />
      <Stack.Screen
        name="learning"
        component={learning}
        options={{ title: 'learning' }}
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
