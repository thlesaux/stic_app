import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import MainStackNavigator from './navigation/navigation';
import { Provider } from 'react-redux';
import globalStyle from './assets/styles/globalStyle';
import Store from './src/configRedux';
import consts from './src/consts';
import * as Font from 'expo-font';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      appIsReady: false
    };
  }


  async componentDidMount() {
    try {
      await Font.loadAsync({
        'Raleway-Regular': require('./assets/fonts/Raleway/static/Raleway-Regular.ttf'),
      }),
        await Font.loadAsync({
          'Raleway-Medium': require('./assets/fonts/Raleway/static/Raleway-Medium.ttf'),
        })
      this.setState({ appIsReady: true })
    } catch (error) {
      console.log(error)
      return
    }
  }


  render() {
    if (this.state.appIsReady) {
      return (
        <Provider store={Store}>
          <StatusBar barStyle="dark-content" />
          <MainStackNavigator />
        </Provider>
      );
    }
    else {
      return (
        <View style={globalStyle.containerLoading}>
          <ActivityIndicator size="large" color={consts.BLUE} />
        </View>)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;