import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import Navigator from './src/navigation/AppNavigator';
import GeneralStatusBarColor from './src/components/GeneralStatusBarColor';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return(
      <Provider store={store}>
        <GeneralStatusBarColor/>
        <Navigator/>
      </Provider>
    ); 
  };
};

export default App;
