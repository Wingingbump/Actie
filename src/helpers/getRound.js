const API_KEY = "api_key=3e0d8b639ceb3235c21d5934466bb62e"
const BASE_URL = "http://api.themoviedb.org/3/"
const EDIT_URL = "person/3/movie_credits&"
const API_URL = BASE_URL + EDIT_URL + API_KEY;
const IMAGE_URL = "https://image.tmdb.org/t/p/original"
const dataArray = []

/**
 * Round object
 * 
 * @param {*} actor1Name 
 * @param {*} actor1Image 
 * @param {*} actor2Name 
 * @param {*} actor2Image 
 * @param {*} movieList 
 */
function Round(actor1Name, actor1Image, actor2Name, actor2Image, movieList) {
  this.actor1Name = actor1Name
  this.actor1Image = actor1Image
  this.actor2Name = actor2Name
  this.actor2Image = actor2Image
  this.movieList = movieList
}

/**
 * Movie Only Filter
 * 
 * @param {*} item takes a media item and ensures it is of Movie
 * @returns a movie
 */
function movieOnly(item) {
  if (item.known_for_department !== "Acting") return false

  for (const media of item.known_for) {
    if (media.media_type !== "movie") return false
  }
  return true
}

/**
 * Filters for Adult, English, 
 * 
 * @param {*} item movieDataJson
 * @returns true if is adult film
 */
function filter(item) {
  adult =  (item.adult)
  if (item.original_language == "en")
  {
    english = true
  }
  else
  {
    english = false
  }
  return (!adult && english)
}



async function generateRound() {
  // Search random actor popular page
  const page = Math.floor(Math.random() * 13) + 1

  // Get actorData
  const actorResponse = await fetch("https://api.themoviedb.org/3/person/popular?language=en-US&page=" + page + "&" + API_KEY);

  // Convert to Json
  const actor1Json = await actorResponse.json();
  // Filter the data to movie actors only
  const dData = actor1Json.results.filter(movieOnly)

  // Grab random movie from Actor's movie list
  const len = dData.length
  const actor1Data = Math.floor(Math.random() * len)
  const randMov = Math.floor(Math.random() * 3)
  const movieID = dData[actor1Data].known_for[randMov].id

  // Store the first actor
  const actor1Name = dData[actor1Data].name

  // Get Actor Image
  const actor1Id = dData[actor1Data].id
  const actor1Image = await fetch("https://api.themoviedb.org/3/person/" + actor1Id + "/images?language=en-US&" + API_KEY)
  const actor1ImageJson = await actor1Image.json()
  const actor1ImageArray = actor1ImageJson.profiles
  // Load all images into an array
  const actor1ImageListArray = []
  for (const image of actor1ImageArray) {
    actor1ImageListArray.push(IMAGE_URL + image.file_path)
  }

  // Get movie Cast list data
  const movieCredits = await fetch('https://api.themoviedb.org/3/movie/' + movieID + '/credits?language=en-US&' + API_KEY)
  // Get Json
  const movieCreditsJson = await movieCredits.json()

  // Get movie Data
  const movieData = await fetch('https://api.themoviedb.org/3/movie/' + movieID + '?language=en-US&' + API_KEY)
  const movieJson = await movieData.json()

  // while film is adult film or not english recall generate
  if (filter(movieJson) == false) 
  {
    await generateRound()
  }
  
  // Select the top 5 actors in the movie that are not actor 1
  const cast = movieCreditsJson.cast.slice(0, 4).filter((item) => item.name !== actor1Name)

  // Get other actor
  const otherActor = cast[Math.floor(Math.random() * 3)];
  const actor2Name = otherActor.name
  const actor2Id = otherActor.id

  // Get actor2 image
  const actor2Image = await fetch("https://api.themoviedb.org/3/person/" + actor2Id + "/images?language=en-US&" + API_KEY)
  const actor2ImageJson = await actor2Image.json()
  const actor2ImageArray = actor2ImageJson.profiles
  // Load all images into an array
  const actor2ImageListArray = []
  for (const image of actor2ImageArray) {
    actor2ImageListArray.push(IMAGE_URL + image.file_path)
  }

  // Movie Matching
  const movieList1 = await fetch("https://api.themoviedb.org/3/person/" + actor1Id + "/movie_credits?language=en-US&" + API_KEY)
  const movieList1Json = await movieList1.json();
  const movieCast1 = movieList1Json.cast
  const movieListArray1 = []
  for (const movie of movieCast1) {
    movieListArray1.push(movie.original_title)
  }

  // Get list of movies for actor 2
  const movieList2 = await fetch('https://api.themoviedb.org/3/person/' + actor2Id + '/movie_credits' + "?language=en-US&" + API_KEY)
  const movieList2Json = await movieList2.json();
  const movieCast2 = movieList2Json.cast
  // Insert actor's 2 movies into an array
  const movieListArray2 = []
  for (const movie of movieCast2) {
    movieListArray2.push(movie.original_title)
  }
  
  // Create an array with both actor's like movies
  const moviesShared = []
  const movieSet1 = new Set(movieListArray1)
  for (const element of movieListArray2)
  {
    if(movieSet1.has(element))
    {
      moviesShared.push(element)
    }
  }

  // Create a round object and add to the dataArray
  const roundData = new Round(actor1Name, actor1ImageListArray[0], actor2Name, actor2ImageListArray[0], moviesShared)
  dataArray.push(roundData)
}

/**
 * Main will give the output of data array modify as needed
 */
async function main() {
  await generateRound();
  return dataArray[dataArray.length - 1];
}

main();



