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