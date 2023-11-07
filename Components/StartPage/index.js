import React from 'react';
import { View,  ImageBackground } from 'react-native';
import {Text, Button } from 'react-native-paper'
import StartPageStyle from './StartPageStyle'

const StartPage = (props) => {

  const bgImg = { uri: 'https://images.unsplash.com/photo-1589395241612-86d52ec4b9f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVzJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D&w=1000&q=80' }

  const getStart = () => {
    props.navigation.navigate("Select User")
    
  }

  return (
    <ImageBackground source={bgImg} resizeMode="cover" style={{ flex: 1 }} >
      <View style={StartPageStyle.mainContainer}>
        <View style={StartPageStyle.StartPageBottomContainer}>
        <Text variant="headlineSmall" style={StartPageStyle.startPageTitle}>Weclome to your bus tracker </Text>
        <Button onPress={getStart} mode="contained" style={StartPageStyle.getStart} >Get Started</Button>
        </View>
      </View>
    </ImageBackground>

  );
}

export default StartPage