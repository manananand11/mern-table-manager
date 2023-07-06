const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const menuRoutes = require("./routes/menuRoutes");
const connectDB = require("./config/db");
const loadData = require("./config/loadData");
const app = express();
dotenv.config();

app.use(cors());

connectDB();

loadData();

app.use("/menu", menuRoutes);

// ---------------------Deployment-------------------
const __dirname1 = path.resolve();

if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname1, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
  );
}else{
  app.get("/", (req, res) => {
    res.send("Running");
  });
}
// ---------------------Deployment-------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
