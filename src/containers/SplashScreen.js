import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    DeviceInfo
    .getInstanceId()
    .then((id) => {
        AsyncStorage
        .getItem(id)
        .then((value) => {
            if(value !== null){
                Actions.chats();
            } else {
                Actions.login();
            }
        });
    });
  }

  render() {
    return (
      <View>
        <Text> Georgian </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
