import React, { useRef, useState } from 'react';
import './App.css';
import { generateRound } from './helpers/tmdb';
import { useEffect } from 'react';
import { createRoom, addUser, watchRoom } from './helpers/database';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData, useDocument } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyA4jmfcTas4pIrxMtjAcCsND8sNAo5I4Ek",
  authDomain: "actiegame.firebaseapp.com",
  projectId: "actiegame",
  storageBucket: "actiegame.appspot.com",
  messagingSenderId: "277824258246",
  appId: "1:277824258246:web:3d8dc113a6366e81afd7c7",
  measurementId: "G-S6Q5V11RSQ"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1></h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}




function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const gameRoomsRef = firestore.collection('gameRooms');
  const usersRef = firestore.collection('users')
  const query = messagesRef.orderBy('createdAt').limit(25);
  const gameRoomID = useRef("initial");
  const gameData = useRef();

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const startGame = async (e) => {
    e.preventDefault();

    const roomID = await createRoom(gameRoomsRef);
    gameRoomID.current = roomID;
    console.log(gameRoomID.current);
    gameRoomsRef.doc(roomID).onSnapshot((doc) => {
      console.log("current data: " + doc.data())
      gameData.current = doc.data();
    })
  }

  useEffect(async () => {
    console.log("Bouta get da document");
    await addUser(usersRef, auth);
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type Here" />

      <button type="submit" disabled={!formValue}>Send</button>
      <button onClick={startGame}>start game</button>
    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}


export default App;
