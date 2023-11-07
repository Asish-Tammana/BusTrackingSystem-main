import {StyleSheet} from 'react-native'

export default StudentLoginStyles = StyleSheet.create({
    bgContainer : { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 40,
        backgroundColor : 'white'
     },
     formContainer : {
        width: '100%',
        padding: 10

     },
     userTextInput : {
        width: '100%',
        marginBottom: 10
     },
     formLabel : {
        alignSelf: 'flex-start',
        marginBottom: 5
     },

     button : {
      padding: 7,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      marginTop: 10,
      backgroundColor: 'purple',
      borderRadius: 5
  },
  buttonText : {
      color: 'white',
      fontSize: 20
  }

})