import React, {useContext} from 'react';
import { View, TouchableHighlight } from 'react-native';
import { TextInput, Text } from 'react-native-paper'
import { AuthContext } from '../../Context/authenticationContext';

const DriverLogin = () => {

  const [usernameInput, updateUsernameInput] = React.useState("user1");
  const [passwordInput, updatePasswordInput] = React.useState("password1")

  const {login,setLoadingStatus} = useContext(AuthContext)

  const loginPressed =  async() => {
    
    setLoadingStatus(true)
    const userDetails = {
      username: usernameInput,
      password: passwordInput,
    }

    const url = 'https://student-bus-locator.onrender.com/driver/login/'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url,options)
    const data = await response.json()


    const {jwtToken, dbUser} = data
    if (jwtToken !== undefined){
      login("Driver", jwtToken, dbUser)
      setLoadingStatus(false)
    }


    
  }


  return (
    <View style={StudentLoginStyles.bgContainer}>
      <Text variant='headlineSmall'>Login</Text>
      <View style={StudentLoginStyles.formContainer}>
        <Text variant="titleMedium" style={StudentLoginStyles.formLabel}>Username</Text>
        <TextInput style={StudentLoginStyles.userTextInput} mode='outlined' label="Enter your Username" value={usernameInput} onChangeText={text => updateUsernameInput(text)} />
        <Text variant="titleMedium" style={StudentLoginStyles.formLabel}>Password</Text>
        <TextInput style={StudentLoginStyles.userTextInput} mode='outlined' label="Enter your Password" secureTextEntry value={passwordInput} onChangeText={text => updatePasswordInput(text)} />
        <TouchableHighlight style={StudentLoginStyles.button} mode="contained" onPress={() => {loginPressed()}}>
          <Text style={StudentLoginStyles.buttonText} >Submit</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default DriverLogin