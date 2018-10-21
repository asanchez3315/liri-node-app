//TODO make moment work
//TODO fix movie search
// TODO env not working for concert & Movie
// 
require("dotenv").config();
var fs = require("fs");


var Spotify = require('node-spotify-api');
var keys = require('./keys.js')
var request = require('request');
var moment = require('moment');



var action = process.argv[2]
var search = process.argv[3]
var artist = search
var movieSearch = search
for (i = 4; i < process.argv.length; i++) {
  artist += "%20" + process.argv[i];
  movieSearch += "+" + process.argv[i]
}
// switch statement

switch (action) {
  case 'concert-this':
    showConcert()
    break

  case 'spotify-this-song':
    spotifySong()
    break

  case 'movie-this':
    showMovie()
    break

  case 'do-what-it-says':
    justDoIt()
    break

  default:
    console.log("{Please enter a command: concert-this, spotify-this-song, movie-this, do-what-it-says}");
    break;
}
function showConcert() {

  request('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp', function (error, response, body) {
    if (error) {
      console.log(error); // Print the error if one occurred
    } else {
      response && response.statusCode // Print the response status code if a response was received
      console.log(JSON.parse(body)[0].venue.name)
      console.log(JSON.parse(body)[0].venue.city)
      console.log(JSON.parse(body)[0].datetime)
    }
  });
}


function spotifySong() {
  var spotify = new Spotify({
    id: keys.spotify.id,

    secret: keys.spotify.secret
  });
  var song
  if (search === undefined) {
    song = 'the sign'
  } else {
    song = search
  }
  spotify.search({ type: 'track', query: song, limit: '1' }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    //  console.log(JSON.stringify(data))
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Preview Here: " + data.tracks.items[0].preview_url);
  });
}


function showMovie() {
  
  var movieSearch
  if (search === undefined) {
    movieSearch = "Mr.Nobody"
  } else {
    movieSearch = search
  }

  request('http://www.omdbapi.com/?t=' + movieSearch + '&y=&plot=short&apikey=trilogy', function (error, response, body) {

    if (error) {
      console.log(error); // Print the error if one occurred
    } else {
      response && response.statusCode
      console.log("Title: " + JSON.parse(body).Title)
      console.log("Year: " + JSON.parse(body).Year)
      console.log("imdbRating: " + JSON.parse(body).imdbRating)
      console.log("MovieRating: " + JSON.parse(body).Ratings[1])
      console.log("Country: " + JSON.parse(body).Country)
      console.log("Language: " + JSON.parse(body).Language)
      console.log("Plot: " + JSON.parse(body).Plot)
      console.log("Actors: " + JSON.parse(body).Actors)

      
    }
  });
}



function justDoIt (){
  fs.readFile('random.txt', "utf8", function(error, data){
   
});
}

