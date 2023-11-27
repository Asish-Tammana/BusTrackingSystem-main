import StartPage from '../StartPage';
import SelectUserPage from '../SelectUserPage';
import StudentAuthenticationPage from '../StudentAuthenticationPage';
import DriverLogin from '../DriverLogin';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Start Page" component={StartPage} />
            <Stack.Screen name='Select User' component={SelectUserPage} />
            <Stack.Screen name="Driver Login" component={DriverLogin} />
            <Stack.Screen name="Student Login and SignUp" component={StudentAuthenticationPage} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthStack