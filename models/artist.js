
  const mongoose = require('./connection.js')

const { Schema, model } = mongoose;
const artistsSchema = new Schema({
    name: String,
    album: String,
    aud: String,
    username: String,
  });

const Artists = model("Artist", artistsSchema);

module.exports = Artists;