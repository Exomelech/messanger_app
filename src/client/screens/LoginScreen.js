import React, {Component} from 'react';
import { Container, Content, ListItem, CheckBox, Body, Button, Text, Form } from 'native-base';
import { connect } from 'react-redux';
import { userLogin } from '../store/actions';
import loginModule from '../js/loginModule';

import AuthHeader      from '../components/AuthHeader';
import ValidationInput from '../components/ValidationInput';
import Loader          from '../components/Loader';

//import AsyncStorage from '@react-native-community/async-storage';
import {AsyncStorage} from 'react-native';

class LoginScreen extends Component{

  constructor(props){
    super(props);
    this.state = {
      enable: false,
      login: '',
      password: '',
      loginValid: false,
      passValid: false,
      remember: false
    };
  };

  async componentDidMount() {
    try {
      const data = await AsyncStorage.getItem('autologin');
      console.log(data)
      if( data ){
        const {login, password, remember} = JSON.parse(data);
        if( remember ){
          const {backendurl} = this.state;
          loginModule.login(login, password, backendurl)
          .then( res => {
            if(res.status == 'ok'){
              /*Action with redux */ 
              //this.props.navigation.navigate('Login');
            };
          });
        };
      };
      this.setState({
        enable: true
      });
    } catch (err){
      console.log(err);
    };
  };

  goToRegistration() {
    this.props.navigation.navigate('Registration');
  };

  handleCheckBox() {
    this.setState({ remember: !this.state.remember });
  };

  async signin() {
    try {
      const { backendurl } = this.props;
      const {login, password, loginValid, passValid} = this.state;
      console.log(login, password, loginValid, passValid);
      if( loginValid && passValid ){
        await loginModule.login(login, password, backendurl)
        .then( res => {
          if(res.status == 'ok'){
            console.log( res );
            //this.props.navigation.navigate('Login');
          }else{
            console.log(res);
          }
        });
      };
    } catch(err) {
      console.warn(err);
    };
  };

  render() {

    const { localization: locale } = this.props;
    const { enable, remember, loginValid, passValid} = this.state;

    const disabled = !(loginValid && passValid);

    if( !enable ){
      return <Loader/>
    };

    return(
      <Container>
        <AuthHeader title='Login'/>
        <Content style={{padding:5}}>
          <Form>
            <ValidationInput
              title = {locale.login}
              min = {6}
              max = {16}
              onChange = {(value, valid) => this.setState({
                login: value,
                loginValid: valid
              })}
            />
            <ValidationInput
              title = {locale.password}
              min = {6}
              max = {16}
              secureTextEntry = {true}
              onChange = {(value, valid) => this.setState({
                password: value,
                passValid: valid
              })}
            />
            <Button bordered disabled={disabled} style={{margin:10}} onPress={this.signin}>
              <Text>{locale.signin}</Text>
            </Button>
            <ListItem style={{margin:10}} onPress = {this.handleCheckBox}>
              <CheckBox
                checked = {remember}
              />
              <Body>
                <Text>Remember me</Text>
              </Body>
            </ListItem>
            <Button
                bordered 
                style={{margin:10}}
                onPress={this.goToRegistration}
              >
              <Text>{locale.regNavigation}</Text>
            </Button>
          </Form>
        </Content>
        {/* <Loader/> */}
      </Container>
    );
  };

};

const mapStateToProps = (state) => {
  return {
    localization: state.localization,
    backendurl: state.backendurl
  };
};

export default connect(mapStateToProps, {userLogin})(LoginScreen);