import React, {Component} from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';
import styles from '../styles/style';
import { connect } from 'react-redux';
import loginModule from '../js/loginModule';

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
      pattern: new RegExp("^[A-Za-z0-9-_]{3,}")
    };
  };

  goToRegistration = () => {
    this.props.navigation.navigate('Registration');
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

    return(
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder={locale.login}
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={(value) => this.setState({login: value})}
              //pattern={"^[A-Za-z0-9-_]{3,}"}
            />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder={locale.password}
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(value) => this.setState({password: value})}
              //pattern={"^[A-Za-z0-9-_]{3,}"}
            />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => {}}>
          <Text style={styles.loginText}>{locale.signin}</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={this.goToRegistration}>
            <Text>{locale.regNavigation}</Text>
        </TouchableHighlight>
      </View>
    );
  };

};

const mapStateToProps = (state) => {
  return {
    localization: state.localization,
    backendurl: state.backendurl
  };
};

export default connect(mapStateToProps)(LoginScreen);