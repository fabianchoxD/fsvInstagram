import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
//import 'bootstrap/dist/css/bootstrap.css';
//import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
	apiKey: "AIzaSyAY4zwuaTvfDCKNJKrCi9eb7D5kaaJl1B8",
    authDomain: "instagramreactjs.firebaseapp.com",
    databaseURL: "https://instagramreactjs.firebaseio.com",
    projectId: "instagramreactjs",
    storageBucket: "instagramreactjs.appspot.com",
    messagingSenderId: "882330672562"
});

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
