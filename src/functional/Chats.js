import firestore from '@react-native-firebase/firestore';

export const loadMyChats = (phone) => {
    return new Promise((resolve, reject) => {
        firestore()
        .collection('chats')
        .where('users', 'array-contains', phone)
        .orderBy('latestMessage.createdAt', 'desc')
        .onSnapshot((QuerySnapshot) => {
            resolve(QuerySnapshot.docs);
        });
    });
};
