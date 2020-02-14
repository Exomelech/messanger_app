import React, {Component} from 'react';
//import { Text, View, TextInput, TouchableHighlight } from 'react-native';
import { Container, Content, ListItem, CheckBox, Body, Button, Text, Form } from 'native-base';
import { connect } from 'react-redux';
import loginModule from '../js/loginModule';

import AuthHeader      from '../components/AuthHeader';
import ValidationInput from '../components/ValidationInput';
import Loader          from '../components/Loader';

class RegistrationScreen extends Component{

  constructor(props){
    super(props);
    this.state = {
      login: '',
      name: '',
      password: '',
      passVerify: '',
      loginValid: false,
      passValid: false,
      verifyValid: false,
      enable: true
    };
  };
  
  goToLogin = () => {
    this.props.navigation.navigate('Login');
  };

  registration = async () => {
    try {
      const { backendurl } = this.props;
      const { login, name, password, loginValid, passValid, verifyValid } = this.state;
      if( loginValid && passValid && verifyValid ){
        this.setState({enable: false});
        loginModule.registration(login, password, name, backendurl)
        .then( res => {
          if(res.status == 'ok'){
            this.props.navigation.navigate('Login');
          };
        });
      }else{
        console.warn('Invalid inputs');
        this.setState({enable: true});
      }
    } catch(err){
      console.warn(err);
      this.setState({enable: true});
    };
  };

  render(){

    const { localization: locale } = this.props;
    const { loginValid, passValid, verifyValid, enable } = this.state;

    const disabled = !(loginValid && passValid && verifyValid);

    if( !enable ){
      return <Loader/>
    };

    return(
      <Container>
        <AuthHeader title='Registration'/>
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
              title = {locale.name}
              max = {30}
              pattern = {false}
              onChange = {(value) => this.setState({ name: value })}
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
            <ValidationInput
              title = {locale.passwordVerify}
              min = {6}
              max = {16}
              secureTextEntry = {true}
              onChange = {(value, valid) => this.setState({
                passVerify: value,
                verifyValid: valid
              })}
            />
            <Button bordered disabled={disabled} style={{margin:10}} onPress={this.registration}>
              <Text>{'Sign up'}</Text>
            </Button>
            <Button
                bordered 
                style={{margin:10}}
                onPress={this.goToLogin}
              >
              <Text>{locale.loginNavigation}</Text>
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

export default connect(mapStateToProps)(RegistrationScreen);