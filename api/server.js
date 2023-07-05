const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const connectDB = require("./config/db");
const loadData=require("./config/loadData")

connectDB();

loadData();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
