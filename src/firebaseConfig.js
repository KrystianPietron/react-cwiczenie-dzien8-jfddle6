import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAcN3k6tQchUGrAQGurzt910B5kZEe2ETk",
    authDomain: "poniedzialek-60723.firebaseapp.com",
    databaseURL: "https://poniedzialek-60723.firebaseio.com",
    projectId: "poniedzialek-60723",
    storageBucket: "poniedzialek-60723.appspot.com",
    messagingSenderId: "526453728712"
};
firebase.initializeApp(config);

export const database = firebase.database()
export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()