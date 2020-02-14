import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const AppNavigator = createSwitchNavigator({
  AuthScreen: AuthNavigator,
  MainScreen: MainNavigator
})

export default createAppContainer(AppNavigator);