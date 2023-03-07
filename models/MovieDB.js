//importing mongoose
const mongoose  = require('mongoose');

//connect app to database
mongoose.connect('mongodb+srv://aswinpaanil:Aswinpa2000@cluster0.twygqfb.mongodb.net/?retryWrites=true&w=majority');

//creating schema (structure of database)
const Schema = mongoose.Schema;

//schema for our app
var movieSchema = new Schema({
    movieName : String,
    movieActor : String,
    movieActress : String,
    movieDirector : String,
    movieYear : Date,
    movieCamera : String,
    movieProducer : String,
    movieLanguage : String
});

//
var MovieInfo = mongoose.model('movies' , movieSchema);

module.exports = MovieInfo;

