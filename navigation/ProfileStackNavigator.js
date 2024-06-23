import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen_simple from '../screens/ProfileScreen_simple';
import QuestionsUploadScreen from '../screens/uploading/QuestionsUploadScreen';
import Alert from '../screens/uploading/Alret';
import learning from '../screens/uploading/Learning';
import ProjectProposal from '../screens/uploading/ProjectProposal';
import Work from '../screens/uploading/Work';
import RentHouse from '../screens/uploading/RentHouse';

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
        component={QuestionsUploadScreen}
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
        name="Project Proposal"
        component={ProjectProposal}
        options={{ title: 'Project Proposal'}}
      />
      <Stack.Screen
        name="Work"
        component={Work}
        options={{ title: 'Work'}}
      />
      <Stack.Screen
        name="Rent House"
        component={RentHouse }
        options={{ title: 'Rent house'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
