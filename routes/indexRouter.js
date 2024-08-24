const { Router } = require("express");
const usersController = require("../controllers/genreController");
const usersRouter = Router();


usersRouter.get("/", (req, res) => {
    res.render("index");
});





module.exports = usersRouter;