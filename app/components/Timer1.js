import React, {Component} from 'react';
import {
  AppRegistry,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import CountdownTimer from 'react-native-countdown-clock';

export default class Timer extends Component{
  render() {
    return(
      <View style={{flex:1}}>
        <TextInput
          style = {styles.input}
          placeholder="Enter Task Name"
          selectTextOnFocus={true}
        />
        <View style={styles.timer}>
        <CountdownTimer
          countdownCompleteMessage="Times up!"
          vibrateOnComplete="true"
          infoText=""
          startButtonTitle="Start"
          startButtonColor="#25b31d"
          startButtonLabel="Press to start"
          pauseButtonTitle="Pause"
          pauseButtonColor="#ada2a2"
          pauseButtonLabel="Press to pause"
          resetButtonTitle="Reset"
          resetButtonColor="#ff0101"
          resetButtonLabel="Press to reset"
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    textAlign:"center",
  },
  timer: {
    height:400,
  },
});

AppRegistry.registerComponent('Timer', () => Timer);
