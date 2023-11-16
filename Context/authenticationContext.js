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

        
        setLoadingStatus(true)
        const userDetails = JSON.stringify(dbUser)
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
            const tokenInserted = await AsyncStorage.getItem('busTrackingToken')
            let dbDetails = await AsyncStorage.getItem('busTrackingUserDetails')
            dbDetails = JSON.parse(dbDetails)
            setUserToken(tokenInserted)
            if(dbDetails === undefined){
                updateUserType("notLoggedIn")
            }else{
                if (dbDetails.my_stop === undefined){
                    updateUserType("Driver")
                }else{
                updateUserType("Student")
                }
            }
        } catch(e){
            console.warn(e)
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