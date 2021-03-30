/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import SenderChatBox from '../utils/SenderChatBox';
import ReceiverChatBox from '../utils/ReceiverChatBox';
import { sendMessage, loadMessages } from '../functional/SingleChat';

export default class SingleChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
      phone: '',
      refresh: false,
    };
  }
  componentDidMount() {
    DeviceInfo
    .getInstanceId()
    .then((id) => {
        AsyncStorage
        .getItem(id)
        .then((phone) => this.setState({phone: phone}));
    });
    loadMessages(this.props.documentid)
    .then((docs) => {
      docs.forEach(message => {
        this.state.messages.push(message.data())
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <View
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableHighlight 
              underlayColor="#D8D8D86B"
              style={{
                width: 40, 
                height: 40,
                borderRadius: 40/2, 
                justifyContent: 'center',
                alignItems: 'center',
              }} 
              onPress={() => Actions.chats()}
            >
              <Icon
                style={{margin: 5}}
                name="angle-left"
                size={28}
                color="#fff"
              />
            </TouchableHighlight>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingLeft: 5,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 22,
                fontWeight: 'bold',
              }}>
              {this.props.firstname} {this.props.lastname}
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              style={{margin: 5}}
              name="ellipsis-v"
              size={25}
              color="#fff"
            />
          </View>
        </View>
        <View style={styles.box2}>
          <FlatList
            data={this.state.messages}
            extraData={this.state.refresh}
            renderItem={(message) => {

              var date = new Date(message.item.createdAt);
              var hours = date.getHours();
              var minutes = date.getMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12;
              minutes = minutes < 10 ? '0'+minutes : minutes;
              var time = hours + ':' + minutes + ' ' + ampm;

              if(message.item.user1phone == this.state.phone) {
                return <SenderChatBox message={message.item.text} time={time} />
              } else {
                return <ReceiverChatBox message={message.item.text} time={time} />
              }
            
            }}
            inverted
          />
        </View>
        <View style={styles.box3}>
          <View style={styles.icons}>
            <Icon style={{margin: 5}} name="smile-o" size={28} color="green" />
          </View>
          <View style={styles.icons}>
            <Icon
              style={{margin: 5}}
              name="paperclip"
              size={28}
              color="green"
            />
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextInput
              ref={input => { this.textInput = input }}
              onChangeText={(message) => this.setState({message})}
              style={{
                height: 40,
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: 50,
              }}
              placeholder="Type your message here.."
            />
          </View>
          <View style={styles.icons}>
            <TouchableHighlight
              underlayColor="#D8D8D86B"
              style={{
                width: 40, 
                height: 40,
                borderRadius: 40/2, 
                justifyContent: 'center',
                alignItems: 'center',
              }} 
              onPress={() => {
                if(this.state.message !== '') {
                  this.textInput.clear();
                  this.setState({refresh: !(this.state.message)}, () => {
                    this.state.messages.unshift(
                    {
                      text: this.state.message,
                      status: 'sending',
                      createdAt: new Date().toString(),
                      user1phone: this.state.phone,
                      user2phone: this.props.phone,
                    });
                    sendMessage(this.props.documentid, this.state.message, this.state.phone, this.props.phone);
                  });
                }
              }}
            >
              <Icon
                style={{margin: 5}}
                name="paper-plane"
                size={28}
                color="green"
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor: 'green',
  },
  box2: {
    flex: 0.8,
  },
  box3: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor: '#ebebeb',
  },
  icons: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
