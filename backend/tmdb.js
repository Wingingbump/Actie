const API_KEY = "api_key=3e0d8b639ceb3235c21d5934466bb62e"
const BASE_URL = "http://api.themoviedb.org/3/"
const EDIT_URL = "person/3/movie_credits&"
const API_URL = BASE_URL + EDIT_URL + API_KEY;

// const res = await fetch(API_URL);
// const json = await res.json();

// console.log(json);


// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTBkOGI2MzljZWIzMjM1YzIxZDU5MzQ0NjZiYjYyZSIsInN1YiI6IjY0YTliNDhkNmEzNDQ4MDE0ZDMxODc1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ica4y5Cm8j3D_skxiTkZVhEjvNWw9mOk__qClveCvfc'
//   }
// };

function movieOnly(item) {
  if (item.known_for_department !== "Acting") return false

  for (const media of item.known_for) {
    if (media.media_type !== "movie") return false
  }
  return true
}

const page = Math.floor(Math.random() * 13) + 1
console.log("page: " + page);
const ares = await fetch("https://api.themoviedb.org/3/person/popular?language=en-US&page=" + page + "&" + API_KEY)

const ajson = await ares.json()
const dData = ajson.results.filter(movieOnly)

const len = dData.length
const randNum = Math.floor(Math.random() * len)
const randMov = Math.floor(Math.random() * 3)
const movieID = dData[randNum].known_for[randMov].id
const firstActorName = dData[randNum].name
console.log("Movie ID: " + movieID);
console.log("Actor 1: " + dData[randNum].name + " " + dData[randNum].popularity);


// console.log("actor: " + dData[randNum].name);
// console.log("popularity: " + dData[randNum].popularity);
const movieTitle = dData[randNum].known_for[randMov].title

const credRes = await fetch('https://api.themoviedb.org/3/movie/'+ movieID + '/credits?language=en-US&' + API_KEY)
const credJson = await credRes.json()
const cast = credJson.cast.slice(0, 4).filter((item) => item.name !== firstActorName)

const otherActor = cast[Math.floor(Math.random() * 3)];
console.log("Actor 2: " + otherActor.name + " " + otherActor.popularity);

const input = prompt("Shared movie: ")
if(input?.toLowerCase() === movieTitle.toLowerCase()) console.log("You got it!");
else console.log("Ur stupid. The correct movie: " + movieTitle);


// const res = await fetch('https://api.themoviedb.org/3/person/3/movie_credits?language=en-US&api_key=3e0d8b639ceb3235c21d5934466bb62e')
// // const formData = res.json();
// const json = await res.json();
// const desiredData = json.cast.filter((item) => item.popularity > 30)
// // console.log(formData);
// // console.log(desiredData[1]);
// const len = desiredData.length
// console.log(len);

// console.log(desiredData[randNum]);



