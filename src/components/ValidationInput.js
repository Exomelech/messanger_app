import React, {useState} from 'react';
import { Item, Label, Input, Text } from 'native-base';

export default ValidationInput = ({ 
    title = 'Title', 
    secure = false, 
    min = 0,
    max = 25,
    pattern = '^[A-z0-9\-_]',
    onError = false,
    onChangeText = false
  }) => {
    
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleTextInput = (input) => {
      const length = input.length;
      let err = false;
      let errMsg = '';
      const regex = new RegExp(`${pattern}{0,${max}}$`);
      if( regex.exec(input) == null ){
        input = value;
      };
      if( min != 0 && length < min ){
        errMsg = `Min ${min} characters`;
        err = true;
      };
      if( length > max ){
        errMsg = `Max ${max} characters`;
        input = input.slice(0, Max);
      };
      setError(err);
      setErrorMsg(errMsg);
      setValue(input);
      if( onError ){
        onError(error);
      };
      if( onChangeText ){
        onChangeText(Input);
      };
    };

    return (
      <Item floatingLabel error={error}>
        <Label>{errorMsg}</Label>
        <Input
          placeholder = {title}
          value = {value}
          secureTextEntry={secure}
          onChangeText = {value => handleTextInput(value)}
          onBlur = { () => setErrorMsg('')}
          //onFocus = {() => this.checkLoginFocus()}
        />
      </Item>
    )

};