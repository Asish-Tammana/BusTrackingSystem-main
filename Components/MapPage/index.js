import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import BusesSelectList from '../BusesSelectList'
import { AuthContext } from '../../Context/authenticationContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Modal from "react-native-modal";
import { DataTable } from 'react-native-paper';




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
    const [activeBus, updateActiveBus] = useState()
    const [seachBusInput, updateBusSearchInput] = useState("")
    const [allStopsList, updateAllStops] = useState([])
    const [stopsList, updateStopsList] = useState(data)
    const [driverLatitude, setDriverLatitude] = useState("0")
    const [driverLongitude, setDriverLongitude] = useState("0")
    const [driverDetails, updateDriverDetails] = useState([])
    const [currentStop, updateCurrentStop] = useState({})
    const [nextStop, updateNextStop] = useState({})
    const [isModalVisible, setModalVisible] = useState(false);

    let timerID;

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const updateStop = () => {
        if (currentPosition < data.length) {
            SetCurrentPositon(currentPosition + 1)
        }
    }

    const updateBus = (bus) => {
        clearInterval(timerID)
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

    const getAllStops = async () => {

        const url = `https://student-bus-locator.onrender.com/bus_stops/`
        const jwtToken = await AsyncStorage.getItem('busTrackingToken')

        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }

        const response = await fetch(url, options)
        if(response.ok){
            const responseData = await response.json()
            const {data} = responseData

            updateAllStops(data)

        }
    }

    const filterTheBuses = async () => {
        
        const filteredList = allStopsList.filter(eachStop => eachStop.stop_name.toLowerCase().includes(seachBusInput.toLowerCase()))
        updateBusesList(filteredList)

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
        url = `https://student-bus-locator.onrender.com/drivers/`
        options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }

        response = await fetch(url, options)
        responseData = await response.json()
        const driversList = responseData.data


        let driverObj = driversList.filter(each => each.driver_id == driver_id)
        driverObj = driverObj[0]


        const driverKeysList = {
            "driver_name": "Driver Name",
            "phone_number": "Phone Number",
            "bus_id": "Bus Number",
            'driver_id': 'Driver ID'
        }

        let driverDetails = []

        for (const key in driverObj) {
            if (driverKeysList[key] !== undefined) {
                driverDetails.push({ key: driverKeysList[key], value: driverObj[key] });
            }
        }

        updateDriverDetails(driverDetails)
        getDriverLocation()

        
        
    }

    const getDriverLocation = async () => {

        const jwtToken = await AsyncStorage.getItem('busTrackingToken')
         const driverObj = driverDetails.filter(each => each.key === "Driver ID")[0]
          const driverID = driverObj['value']
         console.log(driverDetails)
         console.log(driverObj)
         console.log(driverID)
        //  const url = `https://student-bus-locator.onrender.com/driver/driver_location/${driverID}`
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         Authorization: `Bearer ${jwtToken}`,
        //     },
        // }
        // const response = await fetch(url, options)
        // const responseData = await response.json()
        // const {data} = responseData
        // setDriverLatitude(data.latitude)
        // setDriverLongitude(data.longitude)
    }

    useEffect(() => {
        setDefaultBus()
        getBusesList()
        getAllStops()
    }, [])

    useEffect(() => {
        getStops()
        getDriverDetails()
        SetCurrentPositon(0)
        if(timerID){
            console.log(timerID)
        }
        // timerID = setInterval(() => {
        //     getDriverLocation()
        // }, 2000);

    }, [activeBus])

    useEffect(() => {
        filterTheBuses()
    }, [seachBusInput])



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
                    <BusesSelectList busesList={busesList} updateBus={updateBus} activeBus={activeBus} updateBusSearchInput={updateBusSearchInput} seachBusInput={seachBusInput} />
                    <Button title="Driver Details" onPress={toggleModal} />
                </View>


                <StepIndicator
                    customStyles={customStyles}
                    labels={stopNames}
                    currentPosition={currentPosition}
                    direction='vertical'
                    stepCount={stopNames.length}
                />

                <Modal isVisible={isModalVisible}>
                    <View style={{ backgroundColor: 'white' }}>
                    <DataTable>
                            {
                                driverDetails.map(each => (
                                    <DataTable.Row key={each.key}>
                                        <DataTable.Cell>{each.key}</DataTable.Cell>
                                        <DataTable.Cell>{each.value}</DataTable.Cell>
                                    </DataTable.Row>
                                ))
                            }
                        </DataTable>
                        <Button title="Close" onPress={toggleModal} />
                    </View>
                </Modal>


                <Button title="Next" onPress={updateStop} />
                <Text> </Text>
            </View>
        </ScrollView>
    );
}

export default MapPage