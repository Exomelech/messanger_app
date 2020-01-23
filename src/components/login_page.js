import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button } from 'native-base';
import { connect } from 'react-redux';
import { request } from '../js/functions.js';
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

  submit = () => {
    const {backendurl: url, backendport: port} = this.props;
    let server = url+':'+port;
    //console.log(server);
    request('get', `http://${server}/helloworld`)
    .then( res => {
      if( res.status === 'ok' ){
        console.log(res)
      };
    });
    // var proceed = false;
    // fetch(`http://${server}/helloworld`)
    //   .then((response) => response.json())
    //   .then((response) => {
    //       console.log(response.a)
    //   })
    //   .catch(err => console.warn('error '+err.message));
  }

  render(){
    //console.log(this.props);
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
        <Button transparent onPress={this.submit}>
          <Text>{this.props.localization['greetingPageSubmitButton'+mode]}</Text>
        </Button>
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