const Cast = require("../models/Cast")


exports.createCast = (data) => { return Cast.create(data) }

exports.getAllCasts = () => { return Cast.find() }

exports.getFilteredCasts = (movieCasts) => { return Cast.find({ _id: { $nin: movieCasts } }) }

exports.validateCasts = (castId) => { return Cast.findById(castId) }

