import React, {useState} from 'react';
import { Item, Label, Input, Text } from 'native-base';

export default ValidationInput = ({ 
    title = 'Title', 
    secureTextEntry = false, 
    min = 0,
    max = 25,
    onChange = false,
    pattern = /^[A-Z0-9-_]+$/i
  }) => {
    
    const [value, setValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleTextInput = (input) => {
      const length = input.length;
      let valid = true;
      let error = '';

      if( pattern == false || pattern.test(input) || length == 0 ){
        if( length < min ){
          error = `Min ${min} characters`;
          valid = false;
        };
        if( length <= max ){
          setValue(input);
          setErrorMsg(error);
          if( onChange ){
            onChange( input, valid );
          };
        }else{
          setErrorMsg(`Max ${max} characters`);
        };
      }else{
        setErrorMsg('Invalid input');
      };

    };

    return (
      <Item floatingLabel>
        <Label>{errorMsg}</Label>
        <Input
          placeholder = {title}
          value = {value}
          secureTextEntry={secureTextEntry}
          onChangeText = {value => handleTextInput(value)}
          onBlur = { () => setErrorMsg('')}
          //onFocus = {() => this.checkLoginFocus()}
        />
      </Item>
    )

};