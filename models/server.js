const express = require("express");
const axios = require("axios");
cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.giphyPath = "/api/v1/giphy";
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.giphyPath, require("../routes/giphy"));
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Server running on port", this.port);
    });
  }
}
module.exports = Server;
