import React, { useContext } from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native';
import { AuthContext } from '../../Context/authenticationContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapPage from '../MapPage';
import StudentProfile from '../StudentProfile';

const Tab = createBottomTabNavigator();



const StudentSection = () => {

    const { logout } = useContext(AuthContext)

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


// {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
//         <Text style={{color: 'black'}}>This is Student Section Page</Text>
//         <TouchableHighlight style={StudentLoginStyles.button} mode="contained" onPress={() => {logout()}} >
//           <Text style={StudentLoginStyles.buttonText} >Logout</Text>
//         </TouchableHighlight>
//       </View>  */}