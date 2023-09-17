import { useNavigate } from "react-router-dom"
import { firestore } from '../App';
import { useEffect } from "react";
import { addUser } from "../helpers/database";

export function Home({ user }) {
  const usersRef = firestore.collection('users')
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      console.log("Bouta get da document");
      await addUser(usersRef, user);
    }) ();
  }, [])
  

  const createGame = () => {
    navigate('/host')
    console.log("starting game")
  }
  const joinGame = () => {
    navigate('/player')
    console.log('joining game')
  }
  return (
    <>
      <button onClick={createGame}>create game</button>
      <button onClick={joinGame}>join game</button>
    </>
  );
}