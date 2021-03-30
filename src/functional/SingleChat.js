import firestore from '@react-native-firebase/firestore';

export const loadMessages = (docid) => {
    return new Promise((resolve, reject) => {
        firestore()
        .collection('chats')
        .doc(docid)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot((data) => {
            resolve(data.docs);
        });
    })
};

export const sendMessage = async (docid, message, phone1, phone2) => {
    firestore()
    .collection('chats')
    .doc(docid)
    .collection('messages')
    .add({
        text: message,
        status: 'sent',
        createdAt: new Date().toString(),
        user1phone: phone1,
        user2phone: phone2,
    });
    
    await firestore()
    .collection('chats')
    .doc(docid)
    .update({
        latestMessage: {
            text: message,
            createdAt: new Date(),
        }
    })
}