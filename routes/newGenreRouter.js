const { Router } = require("express");

const genreController = require("../controllers/genreController");
const newGenreRouter = Router();



newGenreRouter.get("/", genreController.createNewGenreGet);
newGenreRouter.post("/", genreController.createNewGenrePost);

module.exports = newGenreRouter;