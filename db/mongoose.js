const mongoose = require("mongoose");
const keys = require("../config/keys");
const debug = require("debug")("agente-esp:db");

mongoose.Promise = global.Promise; // set mongoose to use js built in promises

const mongoUri = keys.mongoURI;

mongoose
  .connect(mongoUri)
  .then(() => {
    debug("Connected to database: ", mongoUri);
  })
  .catch(err => {});

module.exports.mongoose = mongoose;
