const express = require('express');
const app = express();

const indexRouter = require("./routes/indexRouter");
const gameRouter = require("./routes/gameRouter");
const genreRouter = require("./routes/genreRouter");
const newGameRouter = require("./routes/newGameRouter");
const newGenreRouter = require("./routes/newGenreRouter");

const handleInternalError = require('./middleware/handleInternalError');

const path = require("node:path");

require("dotenv").config();

// serving static assets (for the css in this case)
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.use("/", indexRouter);
app.use("/games", gameRouter);
app.use("/genres", genreRouter);
app.use("/newGame", newGameRouter);
app.use("/newGenre", newGenreRouter);

app.get('*', (req, res) => {
    res.render('pageNotFoundError', {title: 'Page Not Found'})
});

app.use(handleInternalError);


const PORT = process.env.PORT || 8080;
app.listen(PORT);
