import React, { useRef, useState, useContext } from 'react';
import { generateRound } from '../helpers/tmdb';
import { useEffect } from 'react';
import { createRoom, addUser, watchRoom } from '../helpers/database';
// import { guessCheck } from '../helpers/database';

import { LevelContext, firestore } from '../App';
import 'firebase/firestore'; 
import 'firebase/auth';
import 'firebase/analytics';

export function GamePlayer({ user }) {

  return (
    <>
      <h1>Player</h1>
      <form>

      <input placeholder="You are a player" />

      </form>
    </>
  );
}