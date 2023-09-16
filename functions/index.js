/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.startGame = functions.https.onCall(async (data, context) => {
  // Sample data for now. In reality, you'll fetch this from TMDB or another source.
  const actor1name = "Tom Hanks";
  const actor2name = "Meg Ryan";
  const movieList = ["Sleepless in Seattle", "You've Got Mail"];

  // Add to the "games" table in Firestore
  const gameDoc = {
      actor1Name: actor1name,
      actor2Name: actor2name,
      
      movies: movieList,
  };

  // Add the document to the 'games' collection
  const addedDoc = await db.collection('games').add(gameDoc);

  return { success: true, docId: addedDoc.id };
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
