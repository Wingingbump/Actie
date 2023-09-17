import { firestore } from '../App';
import { useEffect, useState } from "react";
import { createRoom } from "../helpers/database";
import { useParams, useNavigate } from 'react-router-dom';

export function WaitingRoom({ user }) {
  const gameRoomsRef = firestore.collection('gameRooms');
  const params = useParams();
  const players = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const roomID = params.roomID;

      gameRoomsRef.doc(roomID).onSnapshot((doc) => {
        console.log(doc.data().players)
      })
    }) ();
  }, [])

  const startGame = async () => {
    const roomID = params.roomID;
    const roomRow = await gameRoomsRef.doc(roomID).get();

    // if user is the host, they'll be first in 'players'
    if (roomRow.data.players[0].id == user.email) navigate(`/host/${roomID}`);
    else navigate(`/player/${roomID}`)
  }
  
  return (
    <>
      {/* <ul>
        {players.map((player) => (
          <li>{player}</li>
        ))}
      </ul> */}
      <button onClick={startGame}>start game</button>
    </>
  );
}