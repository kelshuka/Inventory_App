
const pool = require("./pool");

async function getAllGames() {
    const { rows } = await pool.query("SELECT * FROM games");
    return rows;
}

async function getGamesByID(id) {
    const { rows } = await pool.query("SELECT id, name, img, description, price, rating, publisher, publishingDate, quantity, genre FROM games WHERE id = $1", 
        [id],);
    return rows;
}

async function getAllGenres() {
    const { rows } = await pool.query("SELECT * FROM genres");
    return rows;
}

async function getGenresByID(id) {
    const { rows } = await pool.query("SELECT * FROM genres WHERE id = $1", [id]);
    return rows;
}

async function getGenresType(genreType) {
    const { rows } = await pool.query("SELECT id, name, img, description, price, rating, publisher, publishingDate, quantity, genre FROM games WHERE genre = $1", 
        [genreType],);
    return rows;
}

async function insertGame(game){
    await pool.query("INSERT INTO games (name, img, description, price, rating, publisher, publishingDate, quantity, genre) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [game.name, game.imgURL, game.description, game.prices, game.rating, game.publisher,
        game.publishingDate, game.quantity, game.genre,
        ]);
}

async function insertGenre(genre){
    await pool.query("INSERT INTO genres (name, img) VALUES ($1, $2)",
        [genre.name, genre.imgURL,
        ]);
}

async function updateGame(game){
    const dataSQL = `
        UPDATE games
        SET name = $1,
            img = $2,
            description = $3,
            price = $4,
            rating = $5,
            publisher = $6,
            publishingDate = $7,
            quantity = $8,
            genre = $9
        WHERE id = $10;
        `;
    await pool.query(dataSQL,
        [game.name, game.imgURL, game.description, game.prices, game.rating, game.publisher,
            game.publishingDate, game.quantity, game.genre, game.id,
        ]);
}

async function deleteGame(id){
    await pool.query("DELETE FROM games WHERE id = $1", [id]);
}

async function updateGenre(genre, id){
    const dataSQL = `
        UPDATE genres
        SET name = $1,
            img = $2
        WHERE id = $3;
        `;
    await pool.query(dataSQL,
        [genre.name, genre.imgURL, id,]);
}

async function deleteGenre(id){
    await pool.query("DELETE FROM genres WHERE id = $1", [id]);
}

module.exports = {
    getAllGames,
    getGamesByID,
    getAllGenres,
    getGenresType,
    getGenresByID,
    insertGame,
    insertGenre,
    updateGame,
    deleteGame,
    updateGenre,
    deleteGenre
};


