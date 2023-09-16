
const API_KEY = "api_key=3e0d8b639ceb3235c21d5934466bb62e"
const BASE_URL = "http://api.themoviedb.org/3/"
const EDIT_URL = "person/3/movie_credits&"
const API_URL = BASE_URL + EDIT_URL + API_KEY;

const IMAGE_URL = "https://image.tmdb.org/t/p/original/"


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
  console.log("page: " + page);

  // Get actorData
  const actorResponse = await fetch("https://api.themoviedb.org/3/person/popular?language=en-US&page=" + page + "&" + API_KEY);

  // Convert to Json
  const actor1Json = await actorResponse.json();
  // Filter the data to movie actors only
  const dData = actor1Json.results.filter(movieOnly)

  // Grab random movie from Actor's movie list
  const len = dData.length
  const Actor1Data = Math.floor(Math.random() * len)
  const randMov = Math.floor(Math.random() * 3)
  const movieID = dData[Actor1Data].known_for[randMov].id

  // Store the first actor
  const firstActorName = dData[Actor1Data].name

  // Get Actor Image
  const actor1Id = dData[Actor1Data].id
  console.log("Actor 1 Id: " + actor1Id)
  
  const actor1Image = await fetch("https://api.themoviedb.org/3/person" + actor1Id + "/images?language=en-US&" + API_KEY)
  const actor1ImageJson = actor1Image.json()
  console.log("Image: " + JSON.stringify(actor1ImageJson))

  // if (actor1Image.json().profiles == 0)
  // {
  //     const actor1Tagged = await fetch("https://api.themoviedb.org/3/person/" + actor1Id + "/tagged_images" + API_KEY)
  //     const actor1TaggedJson = await actor1Tagged.json()
      
  // }

  // Log the movie
  console.log("Movie ID: " + movieID);
  console.log("Actor 1: " + dData[Actor1Data].name + " " + dData[Actor1Data].popularity);

  // Get the movie title
  const movieTitle = dData[Actor1Data].known_for[randMov].title

  // Get movie Cast list data
  //https://api.themoviedb.org/3/movie/41154//credits?language=en-US&api_key=3e0d8b639ceb3235c21d5934466bb62e
  const movieCredits = await fetch('https://api.themoviedb.org/3/movie/' + movieID + '/credits?language=en-US&' + API_KEY)
  // Get Json
  const movieCreditsJson = await movieCredits.json()

  // Get movie Data
  const movieData = await fetch('https://api.themoviedb.org/3/movie/' + movieID + '?language=en-US&' + API_KEY)
  const movieJson = await movieData.json()
  console.log("Adult film: " + movieJson.adult)

  // while film is adult film or not english recall generate
  console.log("Passed filter: " + filter(movieJson))
  if (filter(movieJson) == false) 
  {
    await generateRound()
  }
  
  // Select the top 5 actors in the movie that are not actor 1
  const cast = movieCreditsJson.cast.slice(0, 4).filter((item) => item.name !== firstActorName)

  // Get other actor
  const otherActor = cast[Math.floor(Math.random() * 3)];
  console.log("Actor 2: " + otherActor.name + " " + otherActor.popularity);
  const actor2Id = otherActor.id

  // Movie Matching
  const movieList1 = await fetch('https://api.themoviedb.org/3/person/' + actor1Id + "/movie_credits?language=en-US&" + API_KEY)
  //console.log(JSON.stringify(movieList1.cast.original_title))
  
  const movieCast1 = movieList1
  console.log(Object.keys(movieList1))


  // const movieListArray1 = [];
  // for (const movie of movieCast1) {
  //   movieListArray1.push(movie.original_title)
  // }
  
  console.log(movieListArray1.toString())

  

  movieList2 = await fetch('https://api.themoviedb.org/3/person/' + actor2Id + '/movie_credits' + "?language=en-US&" + API_KEY)

  moviesShared = {}
  
  // for (const element of movieList2)
  // {
  //   if(movieSet1.has(element))
  //   {
  //     moviesShared.push(element)
  //   }
  // }
  
  // if(input?.toLowerCase() === movieTitle.toLowerCase()) console.log("You got it!");
  // else console.log("Ur stupid. The correct movie: " + movieTitle);
  console.log(moviesShared)
  console.log("The correct movie: " + movieTitle)

}

generateRound();



// const res = await fetch('https://api.themoviedb.org/3/person/3/movie_credits?language=en-US&api_key=3e0d8b639ceb3235c21d5934466bb62e')
// // const formData = res.json();
// const json = await res.json();
// const desiredData = json.cast.filter((item) => item.popularity > 30)
// // console.log(formData);
// // console.log(desiredData[1]);
// const len = desiredData.length
// console.log(len);

// console.log(desiredData[Actor1Data]);



