import React from 'react';
import {Header, Right, Body, Title} from 'native-base';
import { colorScheme } from '../styles/style';

export default AuthHeader = (props) => (
  <Header style={{backgroundColor: colorScheme.headerColor}}>
    <Body>
      <Title>{props.title}</Title>
    </Body>
    <Right/>
  </Header>
);
