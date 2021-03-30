/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class SenderChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1, marginVertical: 10}}>
        <View style={styles.messagebox}>
          <Text style={{fontSize: 17, color: 'green'}}>
            {this.props.message}
          </Text>
        </View>
        <Text style={{color: 'gray', marginLeft: 13}}>{this.props.time}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messagebox: {
    borderRadius: 10,
    maxWidth: 200,
    margin: 3,
    padding: 10,
    backgroundColor: '#ebebeb',
  },
});
