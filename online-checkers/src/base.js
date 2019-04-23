import firebase from 'firebase';
import Rebase from 're-base';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyC8PCrTQfXiEes1EjGKbSGCBUtIHXsWxjw",
    authDomain: "online-checkers-43207.firebaseapp.com",
    databaseURL: "https://online-checkers-43207.firebaseio.com",
    projectId: "online-checkers-43207",
    storageBucket: "online-checkers-43207.appspot.com",
    messagingSenderId: "326206395947"
  };
const app = firebase.initializeApp(config);

export default Rebase.createClass(app.database());