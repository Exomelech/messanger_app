import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image, Alert } from 'react-native';
import styles from '../styles/style';

const RegistrationScreen = ({ navigation }) => {
  
  const goToLogin = () => {
    navigation.navigate('Login');
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
            placeholder="User name"
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
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
            placeholder="Password verify"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            //onChangeText={(password) => this.setState({password})}
          />
      </View>

      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => {}}>
        <Text style={styles.loginText}>Registration</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.buttonContainer} onPress={goToLogin}>
          <Text>Login</Text>
      </TouchableHighlight>
    </View>
  );
};

export default RegistrationScreen;