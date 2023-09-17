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
      console.log("current data: " + doc.data())
      gameData.current = doc.data();
      console.log(doc.data().movieList);
      console.log(doc.data().actor1Name);
      console.log(doc.data().actor2Name);
    })

    // host timer
    var timeLeft = 30;
    var timerId = setInterval(countdown, 1000);
    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);
        console.log("boox")
      } 
      else {
        timeLeft--;
      }
    }
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