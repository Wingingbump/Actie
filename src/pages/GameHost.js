import React, { useRef, useState, useContext } from 'react';
import { generateRound } from '../helpers/tmdb';
import { useEffect } from 'react';
import { createRoom, addUser, watchRoom } from '../helpers/database';
// import { guessCheck } from '../helpers/database';

import { LevelContext, firestore } from '../App';
import 'firebase/firestore'; 
import 'firebase/auth';
import 'firebase/analytics';



export function GameHost({ user }) {
  const gameRoomsRef = firestore.collection('gameRooms');
  const usersRef = firestore.collection('users')
  const gameRoomID = useRef("initial");
  const gameData = useRef();
  const userData = useContext(LevelContext);

  const [formValue, setFormValue] = useState('');

  const startGame = async (e) => {
    e.preventDefault();

    const roomID = await createRoom(gameRoomsRef);
    gameRoomID.current = roomID;
    console.log(gameRoomID.current);
    console.log(userData);
    // await guessCheck(gameRoomsRef, gameRoomID.current);

    gameRoomsRef.doc(roomID).onSnapshot((doc) => {
      console.log("current data: " + doc.data())
      gameData.current = doc.data();
      console.log(doc.data().movieList);
      console.log(doc.data().actor1Name);
      console.log(doc.data().actor2Name);
    })
  }

  useEffect(() => {
    // (async () => {
    //   const data = await gameRoomsRef.doc(gameRoomID.current).get();
    //   console.log(data.data)
    // }) ();
    console.log(user);
  })

  return (<>
    <form>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type Here" />

      <button type="submit" disabled={!formValue}>Send</button>
      <button onClick={startGame}>start game</button>
    </form>
  </>)
}