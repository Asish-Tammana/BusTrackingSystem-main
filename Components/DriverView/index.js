import React, {useContext} from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native';
import { AuthContext } from '../../Context/authenticationContext';

const DriverView = (props) => {

  const {logout} = useContext(AuthContext)

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{color: 'black'}}>This is Driver View after login</Text>
        <TouchableHighlight style={StudentLoginStyles.button} mode="contained" onPress={() => {logout()}}>
          <Text style={StudentLoginStyles.buttonText} >Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
  
export default DriverView