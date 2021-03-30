/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import {checkValues} from '../functional/Register';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      yop: '',
    };
  }

  render() {
    return (
      <ScrollView style={{flex: 1, borderWidth: 1.5}}>
        <View style={styles.container}>
          <View style={styles.box1}>
            <Image
              style={styles.logo}
              source={require('../assets/images/h2.png')}
            />
          </View>
          <View style={styles.box3}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 10,
                marginHorizontal: 15,
                fontWeight: 'bold',
                color: 'green',
              }}>
              First name
            </Text>
            <TextInput
              onChangeText={(firstName) => this.setState({firstName})}
              style={{
                borderBottomWidth: 1.5,
                borderBottomColor: 'green',
                marginHorizontal: 15,
                marginTop: 10,
                height: 43,
                padding: 7,
                backgroundColor: '#ebebeb',
                fontSize: 16,
              }}
              placeholder="Enter first name"
              placeholderTextColor="#000"
            />
            <Text
              style={{
                fontSize: 18,
                marginTop: 10,
                marginHorizontal: 15,
                fontWeight: 'bold',
                color: 'green',
              }}>
              Last name
            </Text>
            <TextInput
              onChangeText={(lastName) => this.setState({lastName})}
              style={{
                borderBottomWidth: 1.5,
                borderBottomColor: 'green',
                marginHorizontal: 15,
                marginTop: 10,
                height: 43,
                padding: 7,
                backgroundColor: '#ebebeb',
                fontSize: 16,
              }}
              placeholder="Enter last name"
              placeholderTextColor="#000"
            />
            <Text
              style={{
                fontSize: 18,
                marginTop: 10,
                marginHorizontal: 15,
                fontWeight: 'bold',
                color: 'green',
              }}>
              Phone no.
            </Text>
            <TextInput
              onChangeText={(phone) => this.setState({phone})}
              style={{
                borderBottomWidth: 1.5,
                borderBottomColor: 'green',
                marginHorizontal: 15,
                marginTop: 10,
                height: 43,
                padding: 7,
                backgroundColor: '#ebebeb',
                fontSize: 16,
              }}
              placeholder="Enter phone number"
              placeholderTextColor="#000"
            />
            <Text
              style={{
                fontSize: 18,
                marginTop: 10,
                marginHorizontal: 15,
                fontWeight: 'bold',
                color: 'green',
              }}>
              Email
            </Text>
            <TextInput
              onChangeText={(email) => this.setState({email})}
              style={{
                borderBottomWidth: 1.5,
                borderBottomColor: 'green',
                marginHorizontal: 15,
                marginTop: 10,
                height: 43,
                padding: 7,
                backgroundColor: '#ebebeb',
                fontSize: 16,
              }}
              placeholder="Enter email"
              placeholderTextColor="#000"
            />
            <Text
              style={{
                fontSize: 18,
                marginTop: 10,
                marginHorizontal: 15,
                fontWeight: 'bold',
                color: 'green',
              }}>
              Year of passing(yyyy)
            </Text>
            <TextInput
              onChangeText={(yop) => this.setState({yop})}
              style={{
                borderBottomWidth: 1.5,
                borderBottomColor: 'green',
                marginHorizontal: 15,
                marginTop: 10,
                height: 43,
                padding: 7,
                backgroundColor: '#ebebeb',
                fontSize: 16,
              }}
              placeholder="Enter year of passing"
              placeholderTextColor="#000"
            />
            <TouchableOpacity
              onPress={() =>
                checkValues(
                  this.state.firstName,
                  this.state.lastName,
                  this.state.phone,
                  this.state.email,
                  this.state.yop,
                )
              }
              style={{
                borderWidth: 2,
                borderRadius: 5,
                borderColor: 'green',
                backgroundColor: 'green',
                marginTop: 5,
                marginHorizontal: 15,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 16, color: '#fff'}}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.login()}
              style={{
                width: '20%',
                alignSelf: 'center',
                borderWidth: 1.5,
                borderRadius: 5,
                borderColor: 'green',
                backgroundColor: 'green',
                marginTop: 5,
                marginHorizontal: 15,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                style={{margin: 5}}
                name="long-arrow-left"
                size={40}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  box1: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '90%',
    height: 50,
  },
  box3: {
    flex: 0.6,
  },
});
