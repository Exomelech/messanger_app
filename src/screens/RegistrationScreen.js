import React, {Component} from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';
import styles from '../styles/style';
import { connect } from 'react-redux';
import loginModule from '../js/loginModule';

class RegistrationScreen extends Component{

  constructor(props){
    super(props);
    this.state = {
      login: '',
      name: '',
      password: '',
      passVerify: '',
      pattern: new RegExp("^[A-Za-z0-9-_]{3,}"),
      namePattern: new RegExp("^[А-Яа-яA-Za-z0-9_-]{3,}")
    };
  };
  
  goToLogin = () => {
    this.props.navigation.navigate('Login');
  };

  registration = () => {
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
  };

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
              placeholder={locale.name}
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={(value) => this.setState({name: value})}
              //required pattern={"^[А-Яа-яA-Za-z0-9_-]{3,}"} minLength='3'
            />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder={locale.password}
              //secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(value) => this.setState({password: value})}
              //pattern={"^[A-Za-z0-9-_]{3,}"}
            />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder={locale.passwordVerify}
              //secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(value) => this.setState({passVerify: value})}
              //pattern={"^[A-Za-z0-9-_]{3,}"}
            />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.registration}>
          <Text style={styles.loginText}>{locale.regNavigation}</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={this.goToLogin}>
          <Text>{locale.loginNavigation}</Text>
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

export default connect(mapStateToProps)(RegistrationScreen);