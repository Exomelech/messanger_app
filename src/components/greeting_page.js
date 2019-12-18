import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import { connect } from 'react-redux';
//import AsyncStorage from '@react-native-community/async-storage';

/*
getData = async () => {
  try {
    const value = await AsyncStorage.getItem('sc_autoLogin')
    if(value !== null) {
      // value previously stored
    }
  } catch(e) {
    // error reading value
  }
}
*/
class GreetingPage extends Component {
  render(){
    console.log(this.props);
    return (
      <View>
      <Form>
        <Item>
          <Input placeholder={this.props.localization.login} />
        </Item>
        <Item>
          <Input placeholder={this.props.localization.password} />
        </Item>
      </Form>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    localization: state.localization
  };
}

export default connect(mapStateToProps)(GreetingPage);