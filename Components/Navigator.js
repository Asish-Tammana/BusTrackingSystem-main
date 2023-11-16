import React, { useContext, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Text } from 'react-native-paper'

import DriverView from './DriverView';
import MapPage from './MapPage';
import StartPage from './StartPage';
import SelectUserPage from './SelectUserPage';
import StudentAuthenticationPage from './StudentAuthenticationPage';
import DriverLogin from './DriverLogin';
import StudentSection from './StudentSection';
import AuthStack from './AuthStack';

import { AuthContext } from '../Context/authenticationContext';



const userTypes = {
    student: "Student",
    driver: "Driver",
    notLoginin: "notLoggedIn"
}

const Navigator = () => {

    const { isLoading, userType } = useContext(AuthContext)

    const renderResult = () => {

        if (isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                    <ActivityIndicator size={'large'} />
                    <Text>Loading</Text>
                </View>
            )
        }


        switch (userType) {
            case (userTypes.notLoginin):
                return (
                    <AuthStack />
                )
                break;
            case (userTypes.student):
                return (
                    <StudentSection />
                    // <Stack.Navigator screenOptions={{ headerShown: false }} >
                    //     <Stack.Screen name="Map Page" component={MapPage} />
                    // </Stack.Navigator>
                )
                break;
            case (userTypes.driver):
                return (
                    <DriverView />
                    // <Stack.Navigator screenOptions={{ headerShown: false }} >
                    //     <Stack.Screen name="Driver View" component={DriverView} />
                    // </Stack.Navigator>
                )
                break;
            default:
                break;
        }
    }

    return (
        <>
            {renderResult()}
        </>
    )
}

export default Navigator

// {userType === userTypes.notLoginin ? <AuthStack /> :  (
//     <Stack.Navigator screenOptions={{ headerShown: false }} >
//         <Stack.Screen name="Map Page" component={MapPage} />
//     </Stack.Navigator>
// ) }