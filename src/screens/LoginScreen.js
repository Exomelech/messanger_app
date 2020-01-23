import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image, Alert } from 'react-native';
//import { Container, Header, Content, Form, Item, Input, Button } from 'native-base';
import styles from '../styles/style';

const LoginScreen = ({ navigation }) => {

  const goToRegistration = () => {
    navigation.navigate('Registration');
  };

  return(
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
            placeholder="Login"
            keyboardType="default"
            underlineColorAndroid='transparent'
            // onChangeText={(email) => this.setState({email})}
          />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            //onChangeText={(password) => this.setState({password})}
          />
      </View>

      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => {}}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.buttonContainer} onPress={goToRegistration}>
          <Text>Register</Text>
      </TouchableHighlight>
    </View>
  );
};

export default LoginScreen;