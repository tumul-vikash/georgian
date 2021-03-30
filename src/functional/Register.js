/* eslint-disable no-alert */
import firestore from '@react-native-firebase/firestore';
import {Actions} from 'react-native-router-flux';

export const checkValues = (firstName, lastName, phone, email, yop) => {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (firstName === '') {
    alert('first name cannot be empty');
  } else if (lastName === '') {
    alert('last name cannot be empty');
  } else if (email === '') {
    alert('email cannot be empty');
  } else if (phone === '') {
    alert('phone cannot be empty');
  } else if (yop === '') {
    alert('year of passing cannot be empty');
  } else if (phone.length < 10 || phone.length > 10) {
    alert('invalid phone number');
  } else if (!email.match(mailformat)) {
    alert('invalid email');
  } else {
    console.log('valid details');
    firestore()
      .collection('profiles')
      .doc(phone)
      .get()
      .then((data) => {
        if (data.exists) {
          alert('User already exist. Please login to proceed');
        } else {
          insertNewUser(firstName, lastName, phone, email, yop);
        }
      });
  }
};

export const insertNewUser = async (firstName, lastName, phone, email, yop) => {
  await firestore()
    .collection('profiles')
    .doc(phone)
    .set({
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      yearOfPassing: yop,
      status: 0,
    })
    .then(() => {
      alert(
        'Registered successfully. Please wait for admin verification and confirmation',
      );
      Actions.login();
    });
};
