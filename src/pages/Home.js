import { useNavigate } from "react-router-dom"
import { firestore } from '../App';
import { useEffect } from "react";
import { addUser } from "../helpers/database";
import { createRoom } from "../helpers/database";
import React from 'react';


export function Home({ user }) {
  const gameRoomsRef = firestore.collection('gameRooms');
  const usersRef = firestore.collection('users')
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      console.log("Bouta get da document");
      await addUser(usersRef, user);
    }) ();
  }, [])
  

  const createGame = async () => {
    const roomID = await createRoom(gameRoomsRef, user);

    navigate(`host/${roomID}`);
    console.log("starting game")
  }
  const joinGame = () => {
    navigate('/join')
    console.log('joining game')
  }
  return (
    <>
      <button onClick={createGame}>create game</button>
      <button onClick={joinGame}>join game</button>
    </>
  );
}