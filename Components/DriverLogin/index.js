import React, {useContext} from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native';
import { AuthContext } from '../../Context/authenticationContext';



const DriverLogin = (props) => {

  const loginClicked = () => {
    props.navigation.navigate("Driver View")
  }

  const {login} = useContext(AuthContext)


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{color: 'black'}}>This is Driver Login Page</Text>
        <TouchableHighlight style={StudentLoginStyles.button} mode="contained" onPress={() => {login("Driver")}} >
          <Text style={StudentLoginStyles.buttonText} >Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
  
export default DriverLogin