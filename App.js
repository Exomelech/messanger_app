import React from 'react';
import {Container, Content} from 'native-base';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/store';
import GreetingPage from './src/components/greeting_page';

const styles = StyleSheet.create({
  back: {
    backgroundColor: 'rgb(121,121,121)',
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1
  },
  container: {
    padding: 20
  },
  greetingPage: {
    flex: 1
  }
});

const App = () => (
  <Provider store={store}>
    <Container style={styles.back}>
      <Content>
        <View style={styles.container}>
          <GreetingPage style={styles.greetingPage}/>
        </View>
      </Content>
    </Container>
  </Provider>
);

export default App;
