require("dotenv").config();
const express = require("express");
const app = express();

const con = require("./Db/pizza");
const cors = require("cors");

const bodyParser = require("body-parser");

app.use(
  cors({
    origin: "http://localhost:5500",
  })
);
app.use(bodyParser.json());
const Router = require("./routes/router");
app.use(express.json());
app.use(Router);

app.get("/", (req, res) => {
  res.json("testing");
});
const PORT = 3001;

con.connect(function (err) {
  if (err) throw err;
  app.listen(process.env.PORT || PORT, () => {
    console.log("connected");
  });
});
