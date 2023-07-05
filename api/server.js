const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const menuRoutes=require("./routes/menuRoutes")
const connectDB = require("./config/db");
const loadData = require("./config/loadData");
const app = express();
dotenv.config();

app.use(cors());

connectDB();

loadData();

app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
