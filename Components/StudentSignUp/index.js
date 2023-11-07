import React from 'react';
import { View, TouchableHighlight} from 'react-native';
import { TextInput, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import StudentLoginStyles from '../StudentLogIn/StudentLoginStyles';

const StudentSignUp = (props) => {

  const [usernameInput, updateUsernameInput] = React.useState('')
  const [passwordInput, updatePasswordInput] = React.useState("")
  const [emailInput, updateEmailInput] = React.useState("");
  const [phoneNumberInput, updatePhoneNumberInput] = React.useState('') 
  const navigation = useNavigation()

  const submitPressed = (props) => {
    navigation.navigate("Map Page")
  }

    return (
      <View style={StudentLoginStyles.bgContainer}>
      <Text variant='headlineSmall'>Sign Up</Text>
      <View style={StudentLoginStyles.formContainer}>
        <Text variant="titleMedium" style={StudentLoginStyles.formLabel}>Username</Text>
        <TextInput style={StudentLoginStyles.userTextInput} mode='outlined' label="Enter your username" value={usernameInput} onChangeText={text => updateUsernameInput(text)} />
        <Text variant="titleMedium" style={StudentLoginStyles.formLabel}>Password</Text>
        <TextInput style={StudentLoginStyles.userTextInput} mode='outlined' label="Enter your Password" secureTextEntry value={passwordInput} onChangeText={text => updatePasswordInput(text)} />
        <Text variant="titleMedium" style={StudentLoginStyles.formLabel}>Phone Number</Text>
        <TextInput style={StudentLoginStyles.userTextInput} mode='outlined' label="Enter your phone number" value={phoneNumberInput} onChangeText={text => updatePhoneNumberInput(text)} />
        <Text variant="titleMedium" style={StudentLoginStyles.formLabel}>Email</Text>
        <TextInput style={StudentLoginStyles.userTextInput} mode='outlined' label="Enter your Email" value={emailInput} onChangeText={text => updateEmailInput(text)} />
        <TouchableHighlight style={StudentLoginStyles.button} mode="contained" onPress={submitPressed} >
          <Text style={StudentLoginStyles.buttonText}>Submit</Text>
        </TouchableHighlight>

        
      </View>
    </View>
    );
  }
  
export default StudentSignUp