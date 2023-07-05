const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  category: String,
  label: String,
  price: Number,
  description: String,
});

module.exports = mongoose.model("Menu", menuSchema);
