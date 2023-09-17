import React, { useRef, useState, useContext } from 'react';
import { generateRound } from '../helpers/tmdb';
import { useEffect } from 'react';
import { createRoom, addUser, watchRoom } from '../helpers/database';
import { useParams } from 'react-router-dom';
// import { guessCheck } from '../helpers/database';

import { LevelContext, firestore } from '../App';
import 'firebase/firestore'; 
import 'firebase/auth';
import 'firebase/analytics';



export function GameHost({ user }) {
  const gameRoomsRef = firestore.collection('gameRooms');
  const usersRef = firestore.collection('users')
  const gameData = useRef();
  const params = useParams();

  const [formValue, setFormValue] = useState('');

  const startGame = async (e) => {
    e.preventDefault();

    // const roomID = await createRoom(gameRoomsRef, user);
    // await guessCheck(gameRoomsRef, gameRoomID.current);
    const roomID = params.roomID;

    gameRoomsRef.doc(roomID).onSnapshot((doc) => {
      if (doc.exists) {
        // Check if the document exists before accessing its data
        console.log("current data: " + doc.data());
    
        const data = doc.data();
        if (data) {
          // Check if 'data' is defined before accessing its properties
          gameData.current = data;
          console.log(data.movieList);
          console.log(data.actor1Name);
          console.log(data.actor2Name);
        } else {
          console.error("Document data is undefined.");
        }
      } else {
        console.error("Document does not exist.");
      }
    });
    
    
  }
  
  
  useEffect(() => {
    // (async () => {
    //   const data = await gameRoomsRef.doc(gameRoomID.current).get();
    //   console.log(data.data)
    // }) (); c
    console.log(user.email);
  })
  

  return (<>
    <h1>Host</h1>
    <form>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Host" />

      <button type="submit" disabled={!formValue}>Send</button>
      <button onClick={startGame}>start game</button>
    </form>
  </>)
}