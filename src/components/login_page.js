import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button } from 'native-base';
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
class LoginPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      mode: 'Login'
    };
  };

  switchMode = () => {
    this.setState({
      mode: this.state.mode == 'Login' ? 'Reg' : 'Login'
    });
  };

  render(){
    console.log(this.props);
    const {mode} = this.state;
    return (
      <View>
      <Form>
        <Text>{this.props.localization['greetingPageHeader'+mode]}</Text>
        <Button transparent onPress={() => this.switchMode()}>
          <Text>{this.props.localization['greetingPageButton'+mode]}</Text>
        </Button>
        <Item>
          <Input placeholder={this.props.localization.login} />
        </Item>
        { mode == 'Reg' && 
          <Item>
            <Input placeholder={this.props.localization.username} />
          </Item>
        }
        <Item>
          <Input placeholder={this.props.localization.password}  secureTextEntry={true}/>
        </Item>
        { mode == 'Reg' && 
          <Item>
            <Input placeholder={this.props.localization.passwordVerify} secureTextEntry={true}/>
          </Item>
        }
      </Form>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    localization: state.localization,
    backendurl: state.backendurl,
    backendport: state.backendport
  };
};

export default connect(mapStateToProps)(LoginPage);