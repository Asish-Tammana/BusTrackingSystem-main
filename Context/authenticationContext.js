import React, { useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const AuthContext = React.createContext()



const userTypes = {
    student: "Student",
    driver: "Driver",
    notLoginin: "notLoggedIn"
  }

export const AuthProvider = ({children}) => {

    const [isLoading, setLoadingStatus] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userType, updateUserType] = useState(userTypes.notLoginin)

    const login = (givenUser, jwtToken, dbUser) => {

        const userDetails = JSON.stringify(dbUser)
        setLoadingStatus(true)
        updateUserType(givenUser)
        setUserToken(jwtToken)
        AsyncStorage.setItem('busTrackingToken', jwtToken )
        AsyncStorage.setItem('busTrackingUserDetails', userDetails)
        setLoadingStatus(false)

    }

    const logout = () => {
        
        setLoadingStatus(true)
        AsyncStorage.removeItem('busTrackingToken')
        AsyncStorage.removeItem('busTrackingUserDetails')
        updateUserType(userTypes.notLoginin)
        setUserToken(null)
        setLoadingStatus(false)  
        
    }

    const isLoggedIn = async() => {
        try{
            setLoadingStatus(true)
            const tokenInserted = await AsyncStorage.getItem('busTrackingToken')
            const dbDetails = await AsyncStorage.getItem('busTrackingUserDetails')
            setUserToken(tokenInserted)
            updateUserType("Student")
            setLoadingStatus(false)
        } catch(e){
            console.log("login Issue")
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return(
        <AuthContext.Provider value={{login, logout, isLoading, userToken, userType}} >
            {children}
        </AuthContext.Provider>
    )
}