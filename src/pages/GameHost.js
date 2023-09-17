import React, { useRef, useState } from 'react';
import { generateRound } from '../helpers/tmdb';
import { useEffect } from 'react';
import { createRoom, addUser, watchRoom } from '../helpers/database';

import { firestore } from '../App';
import 'firebase/firestore'; 
import 'firebase/auth';
import 'firebase/analytics';



export function GameHost() {
  const dummy = useRef();
  const gameRoomsRef = firestore.collection('gameRooms');
  const usersRef = firestore.collection('users')
  const gameRoomID = useRef("initial");
  const gameData = useRef();

  const [formValue, setFormValue] = useState('');

  const startGame = async (e) => {
    e.preventDefault();

    const roomID = await createRoom(gameRoomsRef);
    gameRoomID.current = roomID;
    console.log(gameRoomID.current);
    gameRoomsRef.doc(roomID).onSnapshot((doc) => {
      console.log("current data: " + doc.data())
      gameData.current = doc.data();
      console.log(doc.data().movies);
    })
  }

  useEffect(async () => {
    console.log("Bouta get da document");
    await addUser(usersRef, "auth");
  }, [])

  return (<>
    <form>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type Here" />

      <button type="submit" disabled={!formValue}>Send</button>
      <button onClick={startGame}>start game</button>
    </form>
  </>)
}