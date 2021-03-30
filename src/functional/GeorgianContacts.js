import firestore from '@react-native-firebase/firestore';

export const exists = (docid) => {
    return firestore()
    .collection('chats')
    .doc(docid)
    .get()
    .then((data) => {
        if(data.exists) {
            return data;
        } else {
            return false;
        }
    })
};

export const createNewThread = (docid, phone1, phone2, firstName, lastName) => {
    return firestore()
    .collection('chats')
    .doc(docid)
    .set({
        documentid: docid,
        users: [phone1, phone2],
        phone: phone2,
        firstName: firstName,
        lastName: lastName,
        latestMessage: {
            text: '',
            createdAt: new Date(),
        }
    })
};
