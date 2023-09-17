import React, { useRef, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { generateRound } from '../helpers/tmdb';
import { useEffect } from 'react';
import { createRoom, addUser, watchRoom } from '../helpers/database';
// import { guessCheck } from '../helpers/database';

import { LevelContext, firestore } from '../App';
import { useState } from 'react';
import 'firebase/firestore'; 
import 'firebase/auth';
import 'firebase/analytics';

export function JoinGame({ user }) {
  const [formValue, setFormValue] = useState("");
  const navigate = useNavigate();
  
  function goToRoom() {
    navigate('/player');
  }

  return (
    <>
      <form>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Room ID" />

      <button type="submit" disabled={!formValue}>Send</button>
      </form>
    </>
  );
}