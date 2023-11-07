import {StyleSheet} from 'react-native'

export default SelectUserPageStyles = StyleSheet.create({

    buttonContainer : {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 50
    },

    button : {
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        backgroundColor: 'purple',
        borderRadius: 15
    },
    buttonText : {
        color: 'white',
        fontSize: 20
    }
})