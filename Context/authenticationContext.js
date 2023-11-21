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
        updateUserType(givenUser)
        setUserToken(jwtToken)
        AsyncStorage.setItem('busTrackingToken', jwtToken )
        AsyncStorage.setItem('busTrackingUserDetails', userDetails)

    }

    const logout = () => {
        
        AsyncStorage.removeItem('busTrackingToken')
        AsyncStorage.removeItem('busTrackingUserDetails')
        updateUserType(userTypes.notLoginin)
        setUserToken(null)
        
    }

    const isLoggedIn = async() => {
        try{
            const tokenInserted = await AsyncStorage.getItem('busTrackingToken')
            let dbDetails = await AsyncStorage.getItem('busTrackingUserDetails')
            dbDetails = JSON.parse(dbDetails)
            setUserToken(tokenInserted)
            if(dbDetails === null){
                updateUserType("notLoggedIn")
            }else{
                if (dbDetails.my_stop === null){
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
        <AuthContext.Provider value={{login, logout, isLoading, userToken, userType, setLoadingStatus}} >
            {children}
        </AuthContext.Provider>
    )
}