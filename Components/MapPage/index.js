import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import BusesSelectList from '../BusesSelectList'
import DriverDetailsPopUp from '../DriverDetailsPopUp'
import { AuthContext } from '../../Context/authenticationContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Modal, Portal, PaperProvider } from 'react-native-paper';


const data = [
    { time: '09:00', stop_name: 'Stop 1', description: 'Stop 1 Description' },
    { time: '10:45', stop_name: 'Stop 2', description: 'Stop 2 Description' },
    { time: '12:00', stop_name: 'Stop 3', description: 'Stop 3 Description' },
    { time: '14:00', stop_name: 'Stop 4', description: 'Stop 4 Description' },
    { time: '16:30', stop_name: 'Stop 5', description: 'Stop 5 Description' },
    { time: '09:00', stop_name: 'Stop 6', description: 'Stop 6 Description' },
    { time: '10:45', stop_name: 'Stop 7', description: 'Stop 7 Description' },
    { time: '12:00', stop_name: 'Stop 8', description: 'Stop 8 Description' },
    { time: '14:00', stop_name: 'Stop 9', description: 'Stop 9 Description' },
    { time: '16:30', stop_name: 'Stop 10', description: 'Stop 10 Description' },
    { time: '09:00', stop_name: 'Stop 11', description: 'Stop 11 Description' },
    { time: '10:45', stop_name: 'Stop 12', description: 'Stop 12 Description' },
    { time: '12:00', stop_name: 'Stop 13', description: 'Stop 13 Description' },
    { time: '14:00', stop_name: 'Stop 14', description: 'Stop 14 Description' },
    { time: '16:30', stop_name: 'Stop 15', description: 'Stop 15 Description' },
    { time: '09:00', stop_name: 'Stop 16', description: 'Stop 16 Description' },
    { time: '10:45', stop_name: 'Stop 17', description: 'Stop 17 Description' },
    { time: '12:00', stop_name: 'Stop 18', description: 'Stop 18 Description' },
    { time: '14:00', stop_name: 'Stop 19', description: 'Stop 19 Description' },
    { time: '16:30', stop_name: 'Stop 20', description: 'Stop 20 Description' },
]


const MapPage = (props) => {

    const [currentPosition, SetCurrentPositon] = useState(0)
    const [busesList, updateBusesList] = useState([])
    const [activeBus, updateActiveBus] = useState('1')
    const [stopsList, updateStopsList] = useState(data)
    const [driverDetails, updateDriverDetails] = useState({})

    const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 0};




    const { logout } = useContext(AuthContext)

    const updateStop = () => {
        if (currentPosition < data.length) {
            SetCurrentPositon(currentPosition + 1)
        }
    }

    const updateBus = (bus) => {
        updateActiveBus(bus)
    }

    const setDefaultBus = async () => {
        const dbUser = await AsyncStorage.getItem('busTrackingUserDetails')
        const userDetails = JSON.parse(dbUser)
        updateActiveBus(userDetails.default_bus_id)
    }

    const getBusesList = async () => {

        const jwtToken = await AsyncStorage.getItem('busTrackingToken')
        const url = 'https://student-bus-locator.onrender.com/buses/'
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }

        const response = await fetch(url, options)
        const responseData = await response.json()
        const { data } = responseData

        updateBusesList(data)

    }

    const getStops = async () => {

        const jwtToken = await AsyncStorage.getItem('busTrackingToken')
        const url = `https://student-bus-locator.onrender.com/busStops/${activeBus}`
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }

        const response = await fetch(url, options)
        const responseData = await response.json()


        updateStopsList(responseData)

    }


    const getDriverDetails = async () => {

        const jwtToken = await AsyncStorage.getItem('busTrackingToken')
        let url = `https://student-bus-locator.onrender.com/driver/busId/${activeBus}`
        let options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }

        let response = await fetch(url, options)
        let responseData = await response.json()
        const { driver_id } = responseData

        url = `https://student-bus-locator.onrender.com/driver/${driver_id}`
        options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }

        response = await fetch(url, options)
        responseData = await response.json()

        updateDriverDetails(responseData)




    }

    useEffect(() => {
        setDefaultBus()
        getBusesList()
    }, [])

    useEffect(() => {
        getStops()
        getDriverDetails()
        SetCurrentPositon(0)
    }, [activeBus])



    const stopNames = stopsList.map(stop => stop.stop_name);



    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#fe7013',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#fe7013',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#fe7013',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#fe7013',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#fe7013',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#fe7013'
    }



    return (
        <ScrollView>
            <View style={{ flex: 1, padding: 20, height: 1100, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <BusesSelectList busesList={busesList} updateBus={updateBus} activeBus={activeBus} />
                    <Button title="Driver Details" />
                    {/* <DriverDetailsPopUp/> */}
                </View>
                

                <StepIndicator
                    customStyles={customStyles}
                    labels={stopNames}
                    currentPosition={currentPosition}
                    direction='vertical'
                    stepCount={stopNames.length}
                />


                


                <Button title="Next" onPress={updateStop} />
                <Text> </Text>
                <Button title='Logout' onPress={() => { logout() }} />
            </View>
        </ScrollView>
    );
}

export default MapPage