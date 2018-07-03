import firebase from 'firebase'

try {
	const config = {
	  apiKey: "AIzaSyDkquHUnQ1l6rAPqG9UnTSXbgxKnOSbcCY",
	  authDomain: "bachabox-react.firebaseapp.com",
	  databaseURL: "https://bachabox-react.firebaseio.com",
	  projectId: "bachabox-react",
	  storageBucket: "",
	  messagingSenderId: "656356891320"
	};


  firebase.initializeApp(config);

} catch (e) {

}

export const firebaseRef = firebase.database().ref();

export default firebase;
