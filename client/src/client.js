import React from 'react';
import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyAfuf4mOVgXC8Ed-lisZ0u17Y8MutZR7HY",
  authDomain: "prj1-668de.firebaseapp.com",
  databaseURL: "https://prj1-668de.firebaseio.com",
  storageBucket: "prj1-668de.appspot.com",
  messagingSenderId: "911034968968"
};
firebase.initializeApp(config);
export const ref = firebase.database().ref()
export const auth = firebase.auth
export const provider = new firebase.auth.FacebookAuthProvider();
