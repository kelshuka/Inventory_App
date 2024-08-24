const { Client } = require("pg");
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  img VARCHAR (255),
  description TEXT,
  price INTEGER,
  rating REAL,
  publisher VARCHAR (255),
  publishingDate DATE,
  quantity INTEGER,
  genre VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  img VARCHAR (255)
);

INSERT INTO games (name, img, description, price, rating, publisher, publishingDate, quantity, genre)
VALUES
  ('Grand Theft Auto 3', 'https://res.cloudinary.com/dmt9s5xlh/image/upload/v1714381034/54dd0acf-599d-4d3e-9f5a-58636200db3d-GTA3_hero.jpg', 
   'Welcome to Liberty City. Whe. The dark and seedy underworld of Liberty City. Withand Thdps.', 
  30, 4.3, 'Rockstar Games', '2001-10-22', 1000, 'Action'
  ), 
  ('Grand Theft Auto 4', 'https://res.cloudinary.com/dmt9s5xlh/image/upload/v1714380904/d9fc820b-223b-4266-9e68-3e1a42fa2bb2-GTAIV_hero.jpg', 
   'What does the AmericaFor his cousin, Roman, it is ther they can findstatus.', 
  25, 4.5, 'Rockstar Games', '2008-04-29', 25000, 'Adventure'
  ),  
  ('Grand Theft Auto 5', 'https://res.cloudinary.com/dmt9s5xlh/image/upload/v1714463104/1c8375b1-5994-45ff-a435-6f3b1b185829-GTAV_hero.jpg', 
   'Welcome to Los Santos. When a y, a retired bank robber, and a teremselves.', 
  50, 4.4, 'Rockstar Games', '2013-09-17', 1000000, 'Fantasy'
  ),
  ('Minecraft', 'https://upload.wikimedia.org/wikinews/en/7/7a/Minecraft_game_cover.jpeg', A very cool game', 20, 4.3, 'Mojang', '2011-11-18', 23, 'Simulation Games');

  INSERT INTO genres (name, img) VALUES
  ('Action', 'https://res.cloudinary.com/dmt9s5xlh/image/upload/v1714206539/7dcaf5a7-c8da-4df1-b56c-402015935844-Action.jpg'), 
  ('Adventure', 'https://res.cloudinary.com/dmt9s5xlh/image/upload/v1714206604/6a7ad902-8c8b-4760-9426-3091f1263800-Adventure.jpg'), 
  ('Fantasy', 'https://res.cloudinary.com/dmt9s5xlh/image/upload/v1714471473/2b7e3215-1edf-4902-b992-bb3c20607728-skyrim-4.avif'),
  ('Sports', 'https://res.cloudinary.com/dmt9s5xlh/image/upload/v1714472990/cb9e06bd-9586-4900-a20d-9fcf72c870f9-imf6h0igxrk4hnmkcafx.jpg'),
  ('Simulation Games', 'https://upload.wikimedia.org/wikinews/en/7/7a/Minecraft_game_cover.jpeg'),
  ('Open World Games', 'https://res.cloudinary.com/dmt9s5xlh/image/upload/v1714380742/19fc9eb1-ebff-4ed3-9643-b484a2bdf84d-GTASA_hero.jpg')
)
`;


async function main() {
  console.log("seeding...");
  const client = new Client({
      connectionString: process.env.DATABASE_URL
  });
  try {
      await client.connect();
      await client.query(SQL);
      console.log("Done");
  } catch (err) {
      console.error("Error executing query:", err);
  } finally {
      await client.end();
  }
}

main();

