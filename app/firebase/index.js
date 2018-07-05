import firebase from 'firebase'

	const config = {
	  apiKey: "AIzaSyDkquHUnQ1l6rAPqG9UnTSXbgxKnOSbcCY",
	  authDomain: "bachabox-react.firebaseapp.com",
	  databaseURL: "https://bachabox-react.firebaseio.com",
	  projectId: "bachabox-react",
	  storageBucket: "bachabox-react.appspot.com",
	  messagingSenderId: "656356891320"
	};





export const firebaseRef = firebase.initializeApp(config);

export const database = firebase.database();

export default firebase;
