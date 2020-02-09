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
      verifyValid: false
    };
  };
  
  goToLogin = () => {
    this.props.navigation.navigate('Login');
  };

  async registration() {
    try {
      const { backendurl } = this.props;
      const {pattern, namePattern, login, name, password, passVerify} = this.state;
      if( password == passVerify && pattern.test(login) && pattern.test(password) && namePattern.test(name) ){
        loginModule.registration(login, password, name, backendurl)
        .then( res => {
          if(res.status == 'ok'){
            this.props.navigation.navigate('Login');
          };
        });
      }else{
        console.warn('Invalid inputs');
      }
    } catch(err){
      console.warn(err);
    };
  };

  render(){

    const { localization: locale } = this.props;
    const { loginValid, passValid, verifyValid } = this.state;

    const disabled = !(loginValid && passValid && verifyValid);

    return(
      // <View style={styles.container}>
      //   <View style={styles.inputContainer}>
      //     <TextInput style={styles.inputs}
      //         placeholder={locale.login}
      //         keyboardType="default"
      //         underlineColorAndroid='transparent'
      //         onChangeText={(value) => this.setState({login: value})}
      //         //pattern={"^[A-Za-z0-9-_]{3,}"}
      //       />
      //   </View>
      //   <View style={styles.inputContainer}>
      //     <TextInput style={styles.inputs}
      //         placeholder={locale.name}
      //         keyboardType="default"
      //         underlineColorAndroid='transparent'
      //         onChangeText={(value) => this.setState({name: value})}
      //         //required pattern={"^[А-Яа-яA-Za-z0-9_-]{3,}"} minLength='3'
      //       />
      //   </View>
      //   <View style={styles.inputContainer}>
      //     <TextInput style={styles.inputs}
      //         placeholder={locale.password}
      //         //secureTextEntry={true}
      //         underlineColorAndroid='transparent'
      //         onChangeText={(value) => this.setState({password: value})}
      //         //pattern={"^[A-Za-z0-9-_]{3,}"}
      //       />
      //   </View>
      //   <View style={styles.inputContainer}>
      //     <TextInput style={styles.inputs}
      //         placeholder={locale.passwordVerify}
      //         //secureTextEntry={true}
      //         underlineColorAndroid='transparent'
      //         onChangeText={(value) => this.setState({passVerify: value})}
      //         //pattern={"^[A-Za-z0-9-_]{3,}"}
      //       />
      //   </View>

      //   <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.registration}>
      //     <Text style={styles.loginText}>{locale.regNavigation}</Text>
      //   </TouchableHighlight>

      //   <TouchableHighlight style={styles.buttonContainer} onPress={this.goToLogin}>
      //     <Text>{locale.loginNavigation}</Text>
      //   </TouchableHighlight>
      // </View>
      <Container>
        <AuthHeader title='Registragion'/>
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
              pattern = ''
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