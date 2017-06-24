import React, {Component} from 'react';
import {
  AppRegistry,
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import CountdownTimer from './CountdownTimer';

const styles = StyleSheet.create({
  button:{
    height:30,
    width:50,
  },
  input: {
    height:100,
    margin: 20,
    textAlign:'center',
    fontSize:30,
  },
  mainContainer: {
    flexDirection: 'column',
    flex:1,
    justifyContent: 'space-around',
  },
  timer: {
    textAlign:'center',
    textAlignVertical:'center',
    fontSize:100,
  },
  timerView: {
    flexDirection: 'column',
    flex:1,
  },
});

export default class Timer extends Component{
    // standard to take props as param
    constructor(props) {
    // enables use of this.props
    super(props)
    // bind event handlers
    this._onTick = this._onTick.bind(this)
    this._onFinish = this._onFinish.bind(this)
    this._start = this._start.bind(this)
  }

  //callback functions
  _onTick() {}
  _onFinish() {}
  _start(){}


  render() {
    //set date to tick to 15 minutes from now
    let till = new Date();
    till.setMinutes(till.getMinutes() + 15);

    return(
      <View style = {styles.mainContainer}>
        <TextInput
          style = {styles.input}
          placeholder="Enter Task Name"
          selectTextOnFocus={true}
        />
        <View style={styles.timerView}>
          <CountdownTimer
            style={{flex:1, verticalAlign:"center", backgroundColor:'red'}}
            till={till}
            renderTick={(data) => <TimeLabel {...data} />}
            onTick={this._onTick}
            onFinish={this._onFinish}
          />
        </View>
      </View>
    );
  }
}

//private class
class TimeLabel extends Component {
  render() {
    return (
      <View>
        <Text style={styles.timer}>
          {this.props.minutes} : {this.props.seconds}
        </Text>
      </View>
    )
  }
}

AppRegistry.registerComponent('Timer', () => Timer);
