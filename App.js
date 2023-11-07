// import StartPage from './Components/StartPage';
// import SelectUserPage from './Components/SelectUserPage';
// import StudentAuthenticationPage from './Components/StudentAuthenticationPage';
// import DriverLogin from './Components/DriverLogin';
import { AuthProvider } from './Context/authenticationContext';
import Navigator from './Components/Navigator';


const App = () => {

  

  return (
    <AuthProvider>
      <Navigator/>
    </AuthProvider>
  );
}

export default App;