import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ToastAndroid, TouchableHighlight, PermissionsAndroid } from 'react-native';
import { AuthContext } from '../../Context/authenticationContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DataTable, Switch, Divider } from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';




const DriverView = () => {

  const keysObject = {
    'driver_name': "Driver Name",
    'phone_number': 'Phone Number',
    'bus_id': 'Bus Number',

  }

  const [driverDetails, updateDriverDetails] = useState([])
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [currentLatitude, setCurrentLatitute] = useState("")
  const [currentLongitude, setCurrentLongitude] = useState('')
  const [locationStatus, setLocationStatus] = useState("")


  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const getDriverDetails = async () => {

    const details = await AsyncStorage.getItem('busTrackingUserDetails')
    const dbUser = JSON.parse(details)


    const userDetails = [];

    for (const key in dbUser) {
      if (keysObject[key] !== undefined) {
        userDetails.push({ key: keysObject[key], value: dbUser[key] });
      }
    }
    updateDriverDetails(userDetails)

  }

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      // getOneTimeLocation()
      // subscribeLocationLocation()

    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Req",
            message: "This app needs your location"
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // getOneTimeLocation()
          // subscribeLocationLocation()
        } else {
          setLocationStatus("Permission Denied")
        }

      } catch (err) {
        setLocationStatus(err)
      }
    }
  };

  const getOneTimeLocation = () => {
    setLocationStatus("Getting Location ....")

    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus("You are Here");

        const currLatitude = JSON.stringify(position.coords.latitude)
        const currLongitude = JSON.stringify(position.coords.longitude)

        setCurrentLatitute(currLatitude)
        setCurrentLongitude(currLongitude)
      },
      (error) => {
        setLocationStatus(error)
      }
    )
  }

  const updateCoordinatesInDB = async () => {
    
    const coordinateDetails = {
      latitude: currentLatitude,
      longitude: currentLongitude
    }


    
    const jwtToken = await AsyncStorage.getItem('busTrackingToken')
    const details = await AsyncStorage.getItem('busTrackingUserDetails')
    const dbUser = JSON.parse(details)

    const {driver_id} = dbUser

    const url = `https://student-bus-locator.onrender.com/driver/${driver_id}/location/`

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(coordinateDetails),
    }

    const response = await fetch(url, options)
    if(response.ok){
      ToastAndroid.showWithGravity(
        'Coordinates are updating!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }

  }


  useEffect(() => {
    getDriverDetails()
    requestLocationPermission();
  }, [])

  useEffect(() => {
    if (isSwitchOn) {
      const intervalID = setInterval(getOneTimeLocation, 5000)

      return () => clearInterval(intervalID)
    } else {
      setCurrentLatitute("0")
      setCurrentLongitude("0")
    }
  }, [isSwitchOn])

  useEffect(() => {
    updateCoordinatesInDB()
  }, [currentLatitude, currentLongitude])

  const { logout } = useContext(AuthContext)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <Text style={{ fontSize: 20, color: 'black' }}>latitude: {currentLatitude} </Text>
      <Text style={{ fontSize: 20, color: 'black' }}>longitude: {currentLongitude} </Text>
      {isSwitchOn ? <Text style={{ color: 'black' }}>Driving mode ON</Text> : <Text style={{ color: 'black' }}>Driving mode OFF</Text>}
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      <Text style={{ color: 'black' }}>My Details</Text>
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

      <TouchableHighlight style={StudentLoginStyles.button} mode="contained" onPress={() => { logout() }}>
        <Text style={StudentLoginStyles.buttonText} >Logout</Text>
      </TouchableHighlight>
    </View>

  );
}

export default DriverView