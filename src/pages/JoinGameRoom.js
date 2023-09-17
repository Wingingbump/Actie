import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { generateRound } from '../helpers/tmdb';
import { useEffect } from 'react';
import { createRoom, addUser, watchRoom } from '../helpers/database';
import React from 'react';

// import { guessCheck } from '../helpers/database';

import { LevelContext, firestore } from '../App';
import 'firebase/firestore'; 
import 'firebase/auth';
import 'firebase/analytics';

export function JoinGameRoom({ user }) {
  const [formValue, setFormValue] = useState("");
  const navigate = useNavigate();
  
  function goToRoom() {
    navigate(`/player/${formValue}`);
  }

  return (
    <>
      <form onSubmit={goToRoom}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Room ID" />

      <button type="submit" disabled={!formValue}>Send</button>
      </form>
    </>
  );
}