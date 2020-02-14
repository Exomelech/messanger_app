import {createSwitchNavigator} from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

export default createSwitchNavigator({
  Login: LoginScreen,
  Registration: RegistrationScreen
});