import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './src/client/store/store';
import Navigator from './src/client/navigation/AppNavigator';
import GeneralStatusBarColor from './src/client/components/GeneralStatusBarColor';
import Loader from './src/client/components/Loader';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  };

  render() {

    if (!this.state.isReady) {
      return <Loader />;
    };
    return(
      <Provider store={store}>
        <GeneralStatusBarColor/>
        <Navigator/>
      </Provider>
    ); 
  };
};

export default App;
