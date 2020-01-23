import {createAppContainer} from 'react-navigation';
import {createTopTabNavigator} from 'react-navigation-tabs';
import AuthNavigator from './AuthNavigator';

export default createAppContainer(AuthNavigator);