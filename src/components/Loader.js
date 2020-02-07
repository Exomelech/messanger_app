import React from 'react';
import LottieView from 'lottie-react-native';

export default Loader = () => 
  <LottieView 
    source={require('./animations/trail-loading.json')} 
    autoPlay loop 
  />;