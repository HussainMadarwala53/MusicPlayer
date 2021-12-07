import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDYwsqCbp2sQWfjYF_qsiSp98BBD0dlz6k",
  authDomain: "musicapp-1ba52.firebaseapp.com",
  projectId: "musicapp-1ba52",
  storageBucket: "musicapp-1ba52.appspot.com",
  messagingSenderId: "675965210894",
  appId: "1:675965210894:web:e879859f50eacc3cc8c75f"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.database();


