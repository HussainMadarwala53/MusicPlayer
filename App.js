import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const switchNavigator = createSwitchNavigator({
  LoginScreen: { screen: LoginScreen },
  Home: { screen: HomeScreen },
});

const AppContainer = createAppContainer(switchNavigator);
