import React, {Component} from 'react';
import { Container, Content, Item, Icon, CheckBox, Text, Label, Input, Form } from 'native-base';
import { connect } from 'react-redux';
import { userLogin } from '../store/actions';
import loginModule from '../js/loginModule';
import AuthHeader from '../components/AuthHeader';
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
      pattern: new RegExp("^[A-z0-9\-_]{6,}$"),
    };
  };

  goToRegistration = () => {
    this.props.navigation.navigate('Registration');
  };

  checkLoginInput = (login) => {
    this.setState({ login });
  };

  checkLoginBlur = () => {
    const {pattern, login} = this.state;
    this.setState({loginError: !pattern.test(login)});
  };

  checkLoginFocus = () => {
    this.setState({ loginError: false });
  };

  checkPassInput = (password) => {
    this.setState({ password });
  };

  checkPassBlur = () => {
    const {pattern, password} = this.state;
    this.setState({passError: !pattern.test(password)});
  };

  checkPassFocus = () => {
    this.setState({ passError: false });
  };

  signin = () => {
    const { backendurl } = this.props;
    const {pattern, login, password} = this.state;
    if( pattern.test(login) && pattern.test(password) ){
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
    }
  }

  render(){

    const { localization: locale } = this.props;
    const { login, password, loginError, passError } = this.state;

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
      //         placeholder={locale.password}
      //         secureTextEntry={true}
      //         underlineColorAndroid='transparent'
      //         onChangeText={(value) => this.setState({password: value})}
      //         //pattern={"^[A-Za-z0-9-_]{3,}"}
      //       />
      //   </View>
      //   <View>
      //     <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => {}}>
      //       <Text style={styles.loginText}>{locale.signin}</Text>
      //     </TouchableHighlight>
      //     <CheckBox
      //       title='Click Here'
      //       checked={this.state.checked}
      //     />
      //   </View>

      //   <TouchableHighlight style={styles.buttonContainer} onPress={this.goToRegistration}>
      //       <Text>{locale.regNavigation}</Text>
      //   </TouchableHighlight>
      // </View>
      <Container>
        <AuthHeader title='Login'/>
        <Content>
          <Form>
            <Item 
              floatingLabel 
              error={loginError}
            >
              <Label>{locale.login}</Label>
              <Input
                value = {login}
                onChangeText = {(value) => this.checkLoginInput(value)}
                onBlur = { () => this.checkLoginBlur()}
                onFocus = {()=> this.checkLoginFocus()}
              />
            </Item>
            <Item 
              floatingLabel
              error={passError}
            >
              <Label>{locale.password}</Label>
              <Input 
                value = {password}
                secureTextEntry={true}
                onChangeText = {(value) => this.checkPassInput(value)}
                onBlur = { () => this.checkPassBlur()}
                onFocus = {()=> this.checkPassFocus()}
              />
            </Item>
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