const router = require("express").Router();

//here need to be controllers for routing 
const staticController = require("./controller/staticController")
const moviesController = require("./controller/moviesController")
const castsController = require("./controller/castsController")
const authController = require("./controller/authController")

//app use routes

router.use(staticController)
router.use(moviesController)
router.use(castsController)
router.use(authController)

router.all("*", (req, res) => {
    res.status(404).render("404")
})

module.exports = router