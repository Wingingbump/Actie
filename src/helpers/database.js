import { generateRound } from "./tmdb";
import * as xxhash from 'xxhash-wasm';

export async function createRoom(gameRoomsRef) {
  const xxhashAPI = await xxhash.default();
  const timeNow = new Date().toISOString();
  const roomID = xxhashAPI.h64ToString(timeNow);
  
  const [actor1Name, actor2Name, movie] = await generateRound();

  gameRoomsRef.doc(roomID).set({
    actor1Name: actor1Name,
    actor2Name: actor2Name,
    movies: [movie]
  });

  return roomID;
}

export async function addUser(usersRef, auth){
    if (auth.currentUser) {
      await usersRef.add({
        displayName: auth.currentUser.displayName,
        id: auth.currentUser.email,
        points: 0,
        host: false
      })
      console.log(usersRef.doc("poopy"));
      console.log(usersRef.doc.name);
  }
}

// export function watchRoom(gameRoomsRef, roomID) {
//   gameRoomsRef.doc(roomID).onSnapshot((doc) => {
//     console.log("current data: " + doc.data())
//   })
// }