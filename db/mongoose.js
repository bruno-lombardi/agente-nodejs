const mongoose = require("mongoose");
const keys = require("../config/keys");
const debug = require("debug")("agente-esp:db");

mongoose.Promise = global.Promise; // set mongoose to use js built in promises

const mongoUri = keys.mongoURI;

const connect = () => {
  return mongoose
    .connect(mongoUri)
    .then(() => {
      debug("Connected to database: ", mongoUri);
    })
    .catch(err => {});
};

const connectDone = done => {
  mongoose
    .connect(mongoUri)
    .then(() => {
      done();
    })
    .catch(err => {});
};

module.exports = {
  connect,
  connectDone
};
