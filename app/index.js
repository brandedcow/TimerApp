import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  Text,
  View,
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Timer from './components/Timer';

// Create / Define screens
// screen HomeScreen
class HomeScreen extends Component {
  //tabBarLabel required for TabNavigator display
  static navigationOptions = {
    tabBarLabel: 'Home',
  };

  //what is rendered in app
  render() {
    {/* set {object} navigate = tabNabigator's props */}
    const { navigate } = this.props.navigation;
    return <Timer />;
  }
}

class JournalScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Journal',
  };

  render() {
    const { navigate } = this.props.navigation;
    return <Text>Hi</Text>;
  }
}

//use TabNavigator to organize different tabs
const SimpleApp = TabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Journal : {
    screen: JournalScreen,
  },
}, {
  tabBarOptions:{
    activeTintColor: '#ffffff'
  }
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
