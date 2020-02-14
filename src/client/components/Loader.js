import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

export default Loader = () => 
    <LottieView 
      source={require('../styles/animations/trail-loading.json')} 
      autoPlay loop 
    />