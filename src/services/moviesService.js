//in the services need to be controllers functionality
const Movie = require("../models/Movie")
//encode rating to stars
const starsObj = {
    1: "&#x2605;",
    2: "&#x2605; &#x2605;",
    3: "&#x2605; &#x2605; &#x2605;",
    4: "&#x2605; &#x2605; &#x2605; &#x2605;",
    5: "&#x2605; &#x2605; &#x2605; &#x2605; &#x2605;"
}

//getCurrentMovie

exports.getCurrentMovie = async (id) => {
    const currMovie = await Movie.findById(id).populate("casts").lean()
    currMovie.stars = starsObj[currMovie.rating];
    return currMovie
}

exports.getMovie = async (id) => {
    const currMovie = await Movie.findById(id)
    currMovie.stars = starsObj[currMovie.rating];
    return currMovie
}

//searchMOvie
exports.searchMovie = async (data) => {
    let query = {}

    if (!data.title && !data.genre && !data.year) {
        console.log("vliza tuk")
        return []
    }

    if (data.title) {
        query.title = data.title
    }

    if (data.genre) {
        query.genre = data.genre
    }

    if (data.year) {
        query.year = data.year
    }
    console.log(query)
    let searchedMovies = await Movie.find(query).lean()

    console.log(searchedMovies)
    return searchedMovies
}



//createMovie
exports.addMovie = (data) => { return Movie.create(data) }

//getAllMovies
exports.getAllMovies = () => { return Movie.find() }

exports.attachCast = async (movieId, castId) => {
    // const movie = await this.getMovie(movieId);
    // movie.casts.push(castId);
    // //ToDo check id if is validate
    // await movie.save()

    return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } })
}

exports.getTopMovies = () => { return Movie.find({ rating: { $in: [4, 5] } }) }


exports.deleteMovie = async (movieId) => { return Movie.findByIdAndDelete(movieId) }

exports.updateMovie = async (movieId, body) => { return Movie.findByIdAndUpdate(movieId, body) }

