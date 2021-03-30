/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import {loginUser} from '../functional/Login';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <Image
            style={styles.logo}
            source={require('../assets/images/h2.png')}
          />
        </View>
        <View style={styles.box2}>
          <Text
            style={{
              margin: 2,
              fontWeight: 'bold',
              fontSize: 25,
              color: '#807c7e',
            }}>
            login with:
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              style={{margin: 5}}
              name="facebook-official"
              size={40}
              color="#000"
            />
            <Icon
              style={{margin: 5}}
              name="google-plus-square"
              size={40}
              color="#000"
            />
          </View>
        </View>
        <View style={styles.box3}>
          <Text
            style={{
              fontSize: 18,
              marginTop: 30,
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
          <TouchableOpacity
            onPress={() => {
              if(this.state.phone === '') {
                alert('Phone cannot be empty');
              } else {
                loginUser(this.state.phone);
              }
            }}
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
            <Text style={{fontSize: 16, color: '#fff'}}>login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Actions.register()}
            style={{
              borderWidth: 1.5,
              borderRadius: 5,
              borderColor: 'green',
              marginTop: 5,
              marginHorizontal: 15,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, color: 'green'}}>Sign up</Text>
          </TouchableOpacity>
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
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '90%',
    height: 50,
  },
  box2: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box3: {
    flex: 0.6,
  },
});
