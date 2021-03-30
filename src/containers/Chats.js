/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadMyChats} from '../functional/Chats';

export default class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      chats: [],
      refresh: true,
    };
  }

  componentDidMount() {
    DeviceInfo
    .getInstanceId()
    .then((id) => {
        AsyncStorage
        .getItem(id)
        .then((phone) => {
          loadMyChats(phone)
          .then((docs) => this.setState({chats: docs, phone: phone}));
        })
    });
  }
  componentDidUpdate(prevState, prevProps) {
    if (prevState.chats != this.state.chats) {
      loadMyChats(this.state.phone)
      .then((docs) => this.setState({chats: docs}));
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.chats}
          extraData={this.state.refresh}
          renderItem={(chat) => {
            return (
              <TouchableHighlight
                underlayColor="none"
                onPress={() => Actions.singlechat({
                  firstname: chat.item.data().firstName,
                  lastname: chat.item.data().lastName,
                  phone: chat.item.data().phone,
                  documentid: chat.item.data().documentid
                })}
              >
              <View style={styles.listItem}>
                <View style={styles.username}>
                  <Text 
                      style={{
                        color: 'green', 
                        fontSize: 17, 
                        fontWeight: 'bold'
                      }}
                    >
                      {chat.item.data().firstName}
                    </Text>
                  <Text 
                      style={{
                        color: 'green', 
                        fontSize: 17, 
                        fontWeight: 'bold'
                      }}
                    >
                      {' '}{chat.item.data().lastName}
                    </Text>
                </View>
                <Text 
                  style={{
                    color: 'black', 
                    fontSize: 15
                  }}
                  numberOfLines={1}
                >
                  {chat.item.data().latestMessage.text}
                </Text>
              </View>
            </TouchableHighlight>)
         }}
        />
        <TouchableHighlight
          underlayColor="none"
          onPress={() => Actions.contacts()}
          style={styles.fab}>
          <Icon style={{margin: 5}} name="paper-plane" size={30} color="#fff" />
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    marginTop: 5,
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  },
  username: {
    flex: 1,
    flexDirection: 'row',
  },
  fab: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 40,
    backgroundColor: 'green',
    padding: 7,
    bottom: 70,
    right: 30,
  },
});
