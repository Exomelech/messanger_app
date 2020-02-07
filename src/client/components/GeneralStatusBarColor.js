import React from 'react';
import { View } from 'react-native';
import {StyleSheet} from 'react-native';
import { colorScheme } from '../styles/style';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const GeneralStatusBarColor = () => <View style={style.bar}/>;

const style = StyleSheet.create({
  bar: {
    backgroundColor: colorScheme.headerColor,
    height: getStatusBarHeight()
  }
});

export default GeneralStatusBarColor;