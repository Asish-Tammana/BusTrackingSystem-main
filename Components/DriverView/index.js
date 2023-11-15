import React, {useContext, useState, useEffect} from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native';
import { AuthContext } from '../../Context/authenticationContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DataTable } from 'react-native-paper';



const DriverView = () => {

  const keysObject = {
    'driver_name' : "Driver Name",
    'phone_number' : 'Phone Number',
    'bus_id' : 'Bus Number',

  }

  const [driverDetails, updateDriverDetails] = useState([])
  
  const getDriverDetails = async () => {

    const details = await AsyncStorage.getItem('busTrackingUserDetails')
    const dbUser = JSON.parse(details)

    const userDetails = [];

    for (const key in dbUser) {
      if (keysObject[key] !== undefined){
        userDetails.push({ key: keysObject[key] , value: dbUser[key] });
      }
    }
    updateDriverDetails(userDetails)

  }

  useEffect(() => {
    getDriverDetails()
  }, [])

  const {logout} = useContext(AuthContext)

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        <Text style={{color: 'black'}}>My Details</Text>
        <TouchableHighlight style={StudentLoginStyles.button} mode="contained" onPress={() => {logout()}}>
          <Text style={StudentLoginStyles.buttonText} >Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
  
export default DriverView