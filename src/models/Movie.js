const mongoose = require("mongoose")

//creating schema
const movieSchema = new mongoose.Schema({
    director: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: [1900, "invalid year"],
        max: [2030, "invalid year"]
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\//, "invalid url"],
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000,
    },
    casts: [{
        type: mongoose.Types.ObjectId,
        ref: "Cast"
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie