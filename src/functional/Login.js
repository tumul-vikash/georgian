/* eslint-disable no-alert */
import firestore from '@react-native-firebase/firestore';
import {Actions} from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = (phone) => {
  firestore()
    .collection('profiles')
    .doc(phone)
    .get()
    .then((data) => {
      if (data.exists) {
        if (data.data().phone === phone) {
          if (data.data().status === 0) {
            alert(
              'Your details are under verification. Please wait till its confirmed',
            );
          } else if (data.data().status === 1) {
            DeviceInfo
            .getInstanceId()
            .then((id) => {
              try {
                AsyncStorage.setItem(id, phone);
                Actions.chats();
              } catch (e) {
                console.log(e);
              }
            })
          }
        } else {
          alert('invalid login details');
        }
      } else {
        alert('You are not yet registered. Please sign up to continue');
      }
    });
};
