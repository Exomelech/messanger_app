import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import Navigator from './src/navigation/AppNavigator';

const App = () => (
  <Provider store={store}>
    <Navigator/>
  </Provider>
);

export default App;
