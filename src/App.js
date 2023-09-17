import React, { useRef, useState, createContext } from 'react';
import './App.css';
import { generateRound } from './helpers/tmdb';
import { useEffect } from 'react';
import { createRoom, addUser, watchRoom } from './helpers/database';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { GameHost } from './pages/GameHost';
import { GamePlayer } from './pages/GamePlayer';

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
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          {user && <Route path="/host" element={<GameHost user={user}/>} />}
          {user && <Route path="/player" element={<GamePlayer user={user}/>} />}
        </Routes>
        <section>
          {user ? <Home
            user={user} 
           /> : <SignIn />}
        </section>
      </Router>

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




// function ChatRoom() {
//   const dummy = useRef();
//   const gameRoomsRef = firestore.collection('gameRooms');
//   const usersRef = firestore.collection('users')
//   const gameRoomID = useRef("initial");
//   const gameData = useRef();

//   const [formValue, setFormValue] = useState('');

//   const startGame = async (e) => {
//     e.preventDefault();

//     const roomID = await createRoom(gameRoomsRef);
//     gameRoomID.current = roomID;
//     console.log(gameRoomID.current);
//     gameRoomsRef.doc(roomID).onSnapshot((doc) => {
//       console.log("current data: " + doc.data())
//       gameData.current = doc.data();
//       console.log(doc.data().movies);
//     })
//   }

//   useEffect(async () => {
//     console.log("Bouta get da document");
//     await addUser(usersRef, auth);
//   }, [])

//   return (<>
//     <form>

//       <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type Here" />

//       <button type="submit" disabled={!formValue}>Send</button>
//       <button onClick={startGame}>start game</button>
//     </form>
//   </>)
// }

export default App;
export { firestore };
export const LevelContext = createContext("thevidukoditu");