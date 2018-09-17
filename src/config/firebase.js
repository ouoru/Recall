import db from 'react-native-firebase';

const config = {
    debug: false,
    apiKey: "AIzaSyBvfoP5iTf8etNTLgyORZSg7dWS4FPbE2M",
    authDomain: "recall-65d13.firebaseapp.com",
    databaseURL: "https://recall-65d13.firebaseio.com",
    projectId: "recall-65d13",
    storageBucket: "recall-65d13.appspot.com",
    messagingSenderId: "361795944901"
  };

const firebase = db.initializeApp(config);

export default firebase;