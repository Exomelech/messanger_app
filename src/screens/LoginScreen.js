import React, {Component} from 'react';
import { Container, Content, Item, Icon, CheckBox, Button, Text, Label, Input, Form } from 'native-base';
import { connect } from 'react-redux';
import { userLogin } from '../store/actions';
import loginModule from '../js/loginModule';
import AuthHeader from '../components/AuthHeader';
import ValidationInput from '../components/ValidationInput';
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

class LoginScreen extends Component{

  constructor(props){
    super(props);
    this.state = {
      login: '',
      password: '',
      loginError: false,
      passError: false,
    };
  };

  goToRegistration = () => {
    this.props.navigation.navigate('Registration');
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
    const { login, password } = this.state;

    return(
      <Container>
        <AuthHeader title='Login'/>
        <Content style={{padding:5}}>
          <Form>
            <ValidationInput 
              title = {locale.login}
              min = {3}
              max = {16}
              onError = {(err) => this.setState({loginError: err})}
              onChangeText = {value => this.setState({login: value})}
            />
            <ValidationInput 
              title = {locale.password}
              min = {6}
              max = {16}
              onError = {(err) => this.setState({passError: err})}
              onChangeText = {value => this.setState({password: value})}
            />
            <Button bordered style={{margin:10}}>
              <Text>{locale.signin}</Text>
            </Button>
            <Button bordered style={{margin:10}}>
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