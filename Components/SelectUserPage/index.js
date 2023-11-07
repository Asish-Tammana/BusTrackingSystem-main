import React from 'react';
import { View,Button, Image, TouchableHighlight } from 'react-native';
import { Text } from 'react-native-paper'
import SelectUserPageStyles from './SelectUserPageStyles';
import { BsFillPersonFill } from 'react-icons/bs'


const SelectUserPage = (props) => {

  const pressedDriver = () => {
    props.navigation.navigate("Driver Login")
  }

  const pressedStudent = () => {
    props.navigation.navigate("Student Login and SignUp")
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text variant="headlineSmall" style={{ color: 'black' }}>Who are you?</Text>
      <View style={SelectUserPageStyles.buttonContainer}>
        <TouchableHighlight style={SelectUserPageStyles.button} mode="contained" onPress={pressedStudent} >
          <Text style={SelectUserPageStyles.buttonText}>Student</Text>
          </TouchableHighlight>
        <TouchableHighlight style={SelectUserPageStyles.button} mode="contained" onPress={pressedDriver} >
          <Text style={SelectUserPageStyles.buttonText}>Driver</Text>
          </TouchableHighlight>
      </View>
    </View>
  );
}

export default SelectUserPage