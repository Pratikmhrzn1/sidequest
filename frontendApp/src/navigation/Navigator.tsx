import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Screens
import HomeScreen from '../screens/HomeScreen';
import TravelDetailsScreen from '../screens/Traveldetailsscreen';
import VisaRequirementScreen from '../screens/Visarequirementscreen';
import ViewAllApplicationsScreen from '../screens/ViewApplication';



export type RootStackParamList = {
  Home: undefined;
  TravelDetails: {
    residence: string;
    destination: string;
    nationality: string;
  };
  VisaRequirement: {
    nationality: string;
    destination: string;
  };
  ViewAllApplications: {
    nationality: string;
  };
};


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="TravelDetails" component={TravelDetailsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="VisaRequirement" component={VisaRequirementScreen} />
        <Stack.Screen name='ViewAllApplications' component={ViewAllApplicationsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}