import React, {Component} from 'react';
import { Container, Content, ListItem, CheckBox, Body, Button, Text, Form } from 'native-base';
import { connect } from 'react-redux';
import { userLogin } from '../store/actions';
import loginModule from '../js/loginModule';
import AuthHeader from '../components/AuthHeader';
import ValidationInput from '../components/ValidationInput';
//import AsyncStorage from '@react-native-community/async-storage';
import {AsyncStorage} from 'react-native';
import Loader from '../components/Loader';


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

class LoginScreen extends Component{

  constructor(props){
    super(props);
    this.state = {
      enable: false,
      login: '',
      password: '',
      loginError: false,
      passError: false,
      remember: false
    };
  };

  componentDidMount = () => {
    async () => {
      const data = await AsyncStorage.getItem('autologin')
      if( data !== null ){
        const {login, password, remember} =  JSON.parse(data);
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
      }else{
        const defData = {
          remember: false,
          login: '',
          password: ''
        };
        await AsyncStorage.setItem('autologin', JSON.stringify(defData));
      };
    };
    this.setState({
      enable: true
    });
  };

  goToRegistration = () => {
    this.props.navigation.navigate('Registration');
  };

  handleCheckBox = () => {
    this.setState({ remember: !this.state.remember });
  };

  signin = () => {
    const { backendurl } = this.props;
    const {login, password, loginError, passError} = this.state;
    if( !loginError && !passError ){
      loginModule.login(login, password, backendurl)
      .then( res => {
        if(res.status == 'ok'){
          /*

            Action with redux 
          
          */ 
          //this.props.navigation.navigate('Login');
        };
      });
    }else{
      console.warn('Invalid inputs');
    };
  };

  render(){

    const { localization: locale } = this.props;
    const { enable, remember } = this.state;

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
              onError = {(err) => this.setState({loginError: err})}
              onChangeText = {value => this.setState({login: value})}
            />
            <ValidationInput
              title = {locale.password}
              min = {6}
              max = {16}
              secureTextEntry = {true}
              onError = {(err) => this.setState({passError: err})}
              onChangeText = {value => this.setState({password: value})}
            />
            <Button bordered style={{margin:10}} >
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