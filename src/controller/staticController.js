const router = require("express").Router();
const movieService = require("../services/moviesService")
router.get("/", async (req, res) => {
    const movies = await movieService.getAllMovies().lean()
    const is = req.user
    res.render("home", { movies, is })
})

router.get("/about", (req, res) => {
    res.render("about")
})

module.exports = router