import React, { useContext, useDebugValue, useEffect, useState } from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native';
import { AuthContext } from '../../Context/authenticationContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DataTable } from 'react-native-paper';

const StudentProfile = () => {

  const [profileDetails, setProfileDetails] = useState([])

  const getUserDetails = async () => {
    let dbUser = await AsyncStorage.getItem('busTrackingUserDetails')
    dbUser = JSON.parse(dbUser)

    const keysObject = {
      "user_id": "User ID",
      "user_name": "Username",
      "PASSWORD": "Password",
      "phone_number": "Phone Number",
      "email_id": "Email ID",
      "organization_id": "Organization ID",
      "default_bus_id" : "My Bus",
      "my_stop": "My Stop"
    }
  
    const userDetails = [];

    for (const key in dbUser) {
      userDetails.push({ key: keysObject[key] , value: dbUser[key] });
    }

    console.log(userDetails)
    setProfileDetails(userDetails)
  }

  useEffect(() => {
    getUserDetails()
  }, [])


  const { logout } = useContext(AuthContext)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <Text style={{ color: 'black' }}>Profile Details</Text>

      <DataTable>
        {
          profileDetails.map(each => (
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

export default StudentProfile