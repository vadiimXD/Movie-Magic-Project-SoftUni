const router = require("express").Router();
const movieService = require("../services/moviesService")
const { isAuth } = require("../middlewares/authMiddlewares")

router.get("/create", isAuth, (req, res) => {
    res.render("create")
})

router.post("/create", isAuth, async (req, res) => {
    const body = req.body;
    body.owner = req.user.userId
    try {
        await movieService.addMovie(body)
        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.status(404).redirect("404")
    }
})

router.get("/search", async (req, res) => {
    const movies = await movieService.getAllMovies().lean()
    res.render("search", { movies })
})

router.get("/details/:id", async (req, res) => {
    const id = req.params.id;
    const movie = await movieService.getCurrentMovie(id)
    const isOwner = movie.owner && movie.owner == req.user?.userId

    console.log(isOwner)
    res.render("details", { movie, isOwner })

})

//ToDo Search work with too exactly values
router.post("/search", async (req, res) => {
    let movies = await movieService.searchMovie(req.body);
    console.log(movies)
    res.render("search", { movies })
})

router.get("/delete/:id", isAuth, async (req, res) => {
    const id = req.params.id;
    console.log(id)

    await movieService.deleteMovie(id)
    res.redirect("/")
})

router.get("/edit/:id", isAuth, async (req, res) => {
    const id = req.params.id;

    let movie = await movieService.getCurrentMovie(id);

    res.render("edit", { movie })

})

router.post("/edit/:id", isAuth, async (req, res) => {
    const id = req.params.id;
    const body = req.body

    await movieService.updateMovie(id, body)

    res.redirect(`/details/${id}`)


})

router.get("/topmovies", async (req, res) => {
    const movies = await movieService.getTopMovies().lean()
    res.render("topmovies", { movies })
})


module.exports = router;