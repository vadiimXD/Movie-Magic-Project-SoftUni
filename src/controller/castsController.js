const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const castService = require("../services/castsService");
const movieService = require("../services/moviesService");

router.get("/cast/create", (req, res) => {
    res.render("cast-create")
})

router.post("/cast/create", async (req, res) => {
    try {
        await castService.createCast(req.body)
        res.redirect("/")
    } catch (error) {
        res.redirect("/404")
    }
})

router.get("/attach/:movieId", async (req, res) => {
    const movie = await movieService.getCurrentMovie(req.params.movieId);
    const casts = await castService.getFilteredCasts(movie.casts).lean()

    res.render("cast-attach", { movie, casts })
})

router.post("/attach/:movieId", async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.body.cast)) {
        return res.redirect("/404")
    }

    await movieService.attachCast(req.params.movieId, req.body.cast)

    res.redirect("/")

})

module.exports = router