import { generateRound } from "./tmdb";
import { getRoundData } from "./getRound";
import * as xxhash from 'xxhash-wasm';

/**
 * Enter Room data into database
 */
export async function createRoom(gameRoomsRef, user) {
  const xxhashAPI = await xxhash.default();
  const timeNow = new Date().toISOString();
  const roomID = xxhashAPI.h64ToString(timeNow);
  
  const roundData = await getRoundData();

  gameRoomsRef.doc(roomID).set({
    actor1Name: roundData.actor1Name,
    actor2Name: roundData.actor2Name,
    actor1Image: roundData.actor1Image,
    actor2Image: roundData.actor2Image,
    movieList: roundData.movieList,
    players: [
      {
        displayName: user.displayName,
        id: user.email,
        points: 0,
        host: true
      }
    ]
  });

  return roomID;
}

/**
 * Checks guess against the db
 */
export async function guessCheck(gameRoomsRef, roomID, guess) {
  // get the current movieList
  console.log(gameRoomsRef.doc(roomID, "movieList"));
  const roomDoc = await gameRoomsRef.doc(roomID).get();
  const movieList = roomDoc.data().movieList;
  for (const element in movieList) {
    if (guess == element) {
      return true;
    }
  }
  return false;

}



/**
 * add users to the room in the database
 */
export async function addUser(usersRef, user){
  // xxhash is deterministic
  const xxhashAPI = await xxhash.default();
  const userdbID = xxhashAPI.h64ToString(user.email);
  await usersRef.doc(userdbID).set({
    displayName: user.displayName,
    id: user.email,
    points: 0,
    host: true
  })
  console.log(usersRef.doc.name);
  
}

// export function watchRoom(gameRoomsRef, roomID) {
//   gameRoomsRef.doc(roomID).onSnapshot((doc) => {
//     console.log("current data: " + doc.data())
//   })
// }