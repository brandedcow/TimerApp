import React, {Component} from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'

export default class CountdownTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeRemaining: this.getInitialTimeRemaining(this.props.till),
      timeoutId: null,
      prevTime: null,
      isMounted: false,
      startButton: false,
      stopButton: true,
      doneButton: true,
    }
  }

//initialize tick after a component is mounted and read to use
  componentDidMount() {
    this.tick()
  }

//called after receiving new props / re-rendering
  componentWillReceiveProps(newProps) {
    if (this.state.timeoutId) clearTimeout(this.state.timeoutId)
    this.setState({prevTime: null, timeRemaining: newProps.initialTimeRemaining})
  }

  //update DOM in response to state changes
  // initialize tick after a component is re rendered
  componentDidUpdate() {
    if ((!this.state.prevTime) && this.state.timeRemaining > 0 && this.state.isMounted) {
      this.tick()
    }
  }

  //cleanup
  componentWillUnmount() {
    clearTimeout(this.state.timeoutId)
    this.setState({isMounted: false})
  }

  //gets time remaining
  getInitialTimeRemaining(till) {
    return Math.abs(till.getTime() - new Date().getTime())
  }

  tick() {
    const currentTime = Date.now()
    // if prevTime is not null, dt = difference in time, else dt = 0
    // currentTime - prevTime = time elapsed
    const dt = this.state.prevTime ? (currentTime - this.state.prevTime) : 0
    // 1 second intervals
    const interval = 1000

    // timeRemainingInInterval = calculate amount of time in interval leftover after time elapsed
    const timeRemainingInInterval = (interval - (dt % interval))
    let timeout = timeRemainingInInterval

    // if leftover time in interval is less than half a second, add a second to leftover time
    // timeout = leftovertime
    if (timeRemainingInInterval < (interval / 2.0)) {
      timeout += interval
    }

    // adjust time remaining, timeRemaining - difference in time
    const timeRemaining = Math.max(this.state.timeRemaining - dt, 0)
    // countdownComplete = timeRemaining and last time check is zero
    const countdownComplete = (this.state.prevTime && timeRemaining <= 0)

    if (this.state.isMounted) {
      // if timeoutID exists, clear it (refresh)
      if (this.state.timeoutId) { clearTimeout(this.state.timeoutId) }
      // redefine states
      this.setState({
        // if coutdown is complete, make timeoutID null, else calls tick after set time in interval
        timeoutId: countdownComplete ? null : setTimeout(this.tick.bind(this), timeout),
        // upadate prevTime
        prevTime: currentTime,
        timeRemaining: timeRemaining
      })
    }

    // if complete, call onFinish function defined in props
    if (countdownComplete) {
      // check if onFinish is defined in props
      if (this.props.onFinish) {
        this.props.onFinish()
      }
      return
    }

    // if check if onTick is defined in props
    if (this.props.onTick) {
      this.props.onTick(timeRemaining)
    }
  }

  // formats time into second-minutes-hours
  getFormattedTime(milliseconds) {
    const totalSeconds = Math.round(milliseconds / 1000)

    let seconds = parseInt(totalSeconds % 60, 10)
    let minutes = parseInt(totalSeconds / 60, 10) % 60
    let hours = parseInt(totalSeconds / 3600, 10)

    seconds = seconds < 10 ? '0' + seconds : seconds
    minutes = minutes < 10 ? '0' + minutes : minutes
    hours = hours < 10 ? '0' + hours : hours

    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }

    return (
      hours + ':' + minutes + ':' + seconds
    )
  }

  start() {
    this.setState({
      // ismounted starts timer
      isMounted: true,
      // resets button availability
      startButton: true,
      stopButton: false,
      doneButton: false,
    })
  }

  stop() {
    let till = new Date();
    till.setMinutes(till.getMinutes() + 15);

    this.setState({
      timeRemaining: this.getInitialTimeRemaining(till),
      timeoutId: null,
      prevTime: null,
      isMounted: false,
      // reset button availability
      startButton: false,
      stopButton: true,
      doneButton: true,
    })

  }
  done() {

  }

  renderTick(data) {
      const time = this.getFormattedTime(data)
      return this.props.renderTick(time)
  }

  render() {
    return (
      <View>
          {this.renderTick(this.state.timeRemaining)}
          {/* test*/}
          <View style={styles.rowContainer}>
            <Button
                style = {styles.button}
                onPress={() => this.start()}
                title='start'
                color='green'
                disabled={this.state.startButton}
            />
            <Button
                style = {styles.button}
                onPress={() => this.stop()}
                title='stop'
                color='red'
                disabled={this.state.stopButton}
            />
          {/*}  <Button
                style = {styles.button}
                onPress={() => done()}
                title='done'
                color='yellow'
                disabled={this.state.doneButton}
            />*/}
          </View>
      </View>
    )
  }
}

//  PropTypes

CountdownTimer.propTypes = {
  till: React.PropTypes.object.isRequired,
  onTick: React.PropTypes.func,
  onFinish: React.PropTypes.func,
  start: React.PropTypes.func,
  renderTick: React.PropTypes.func.isRequired,
}

//  Default props
CountdownTimer.defaultProps = {
  onTick: null,
  onFinish: null
}

//  Styles

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc'
  },
  rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 20,
      borderWidth: 0,
  },
})
