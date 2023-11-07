import React from 'react';
import StudentLogin from '../StudentLogIn';
import StudentSignUp from '../StudentSignUp';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {BsFillPersonFill, BsFillPersonPlusFill} from 'react-icons/bs'
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

const StudentAuthenticationPage = (props) => {
    return (
          <Tab.Navigator screenOptions={({ route }) => ({

            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown : false
          })} >
            <Tab.Screen name="Student Login" component={StudentLogin} />
            <Tab.Screen name="Student Signup" component={StudentSignUp} />
          </Tab.Navigator>
        
      );
  }
  
export default StudentAuthenticationPage