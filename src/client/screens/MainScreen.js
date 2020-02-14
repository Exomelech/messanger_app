import React, {Component} from 'react';
import { Container } from 'native-base';
import AuthHeader      from '../components/AuthHeader';

export default class MainScreen extends Component {

  render(){
    return (
      <Container>
        <AuthHeader title='main screen' />
      </Container>
    );
  };

};