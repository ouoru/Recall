import firebase from '../config/firebase'

class FirebaseService{
    constructor() {

    }

    _test() {
        firebase.database().ref('test').update({
            hi: 'hi'
        })
    }
}

export default new FirebaseService();