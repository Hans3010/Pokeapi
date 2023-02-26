const express = require('express');
const cors = require('cors');
const { db } = require('../database/db');
const { pokemonRouter } = require('../routes/pokemon.routes');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Path Routes
    this.paths = {
      pokemons: '/api/v1/pokemons',
    };
    //Connect to db
    this.database();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.pokemons, pokemonRouter);
  }
  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err));

    //relations

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server Running On Port', this.port);
    });
  }
}

module.exports = Server;
