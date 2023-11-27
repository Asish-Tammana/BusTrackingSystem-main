import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapPage from '../MapPage';
import StudentProfile from '../StudentProfile';

const Tab = createBottomTabNavigator();



const StudentSection = () => {


    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({

                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false
            })} >
                <Tab.Screen name="Map Page" component={MapPage} />
                <Tab.Screen name="Profile Page" component={StudentProfile} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default StudentSection
