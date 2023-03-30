import firebase from "firebase";
import {initializeApp} from "firebase"


const firebaseConfig = {
  apiKey: "AIzaSyDtuXv-eAcK2brHxFwJMnAkdE4ywuG0pXg",
  authDomain: "projetorestaurantvaptvupt.firebaseapp.com",
  databaseURL: "https://projetorestaurantvaptvupt-default-rtdb.firebaseio.com",
  projectId: "projetorestaurantvaptvupt",
};

if(!firebase.apps.length){
  firebase.initializeApp = initializeApp(firebaseConfig);
}

export default firebase;