/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Actions} from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { exists, createNewThread } from '../functional/GeorgianContacts';

export default class GeorgianContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      phone: '',
    };
  }
  componentDidMount() {
    DeviceInfo
    .getInstanceId()
    .then((id) => {
        AsyncStorage
        .getItem(id)
        .then((phone) => this.setState({phone: phone}, () => {
          firestore()
          .collection('profiles')
          .get()
          .then((data) => {
            this.setState({members: data.docs});
          });
        }));
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{flex: 1, backgroundColor: '#ebebeb'}}>
        <View style={{flex: 1}}>
          {this.state.members.map((member, index) => {
            return (
              <TouchableHighlight
                key={index}
                onPress={() => {
                  var docid = this.state.phone + member.data().phone;
                  var altdocid = member.data().phone + this.state.phone;
                  exists(docid)
                  .then((value) => {
                    if(value !== false) {
                      Actions.singlechat({
                        firstname: member.data().firstName,
                        lastname: member.data().lastName,
                        phone: member.data().phone,
                        documentid: docid,
                      });                                                                                                                                                                                                                                             
                    } else {
                      exists(altdocid)
                      .then((value) => {
                        if(value !== false) {
                          Actions.singlechat({
                            firstname: member.data().firstName,
                            lastname: member.data().lastName,
                            phone: member.data().phone,
                            documentid: altdocid
                          });
                        } else {
                          createNewThread(docid, this.state.phone, member.data().phone, member.data().firstName, member.data().lastName)
                          .then(() => {
                            Actions.singlechat({
                              firstname: member.data().firstName,
                              lastname: member.data().lastName,
                              phone: member.data().phone,
                              documentid: docid,
                            });   
                          });
                        }
                      })
                    }
                  })
                }}
                underlayColor="none">
                <View style={styles.contacts}>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 20, color: 'green'}}>
                    {member.data().firstName} {member.data().lastName}
                  </Text>
                  <Text
                    style={{fontWeight: 'normal', fontSize: 17, color: '#000'}}>
                    {member.data().phone}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contacts: {
    padding: 5,
    backgroundColor: '#fff',
    marginTop: 2,
  },
});
