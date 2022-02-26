//require dependencies
const mongo = require("mongoose");
const jwt = require("jsonwebtoken");
const bodyParse = require("body-parser");
const bcrypt = require("bcrypt");
const express = require("express");

//require userModel structure
const { User } = require('./src/model/userModel')
// require userRouter
const {userRouter} = require('./src/userRoute')
const {apiRouter} = require('./src/api')


// require middleware of req from client to server
const cors = require("cors");
//port client
const PORT = process.env.PORT_APP || 8000;
//apply for express server
const app = express();
app.use(cors()); // action req to server

app.use(bodyParse.json()); // action json from client to server
app.use(bodyParse.urlencoded({ extended: true }));

// jwt token authentication
const protectToken = async (req, res, next) => {
  const headToken = req.headers["authorization"];
  if (!headToken) {
    res.status(403).send("NOT AUTHORIZATION");
  }

  const token = headToken.split("")[1];
  console.log(token)
  if (!token) {
    res.status(403).send("NOT TOKEN");
  }

  const data = jwt.decode(token); //compare token for apply
  const user = await User.findById(data.userId);

  if (!user) {
    res.status(403).send("NOT USERS");
  }
  req.userId = user._id;
  next(); //
};

app.use("/api", protectToken, apiRouter);

app.use("/user", userRouter);

app.get("/", (req, res) => {
  console.log("homepage");
  res.send("homepage now");
});

//catch of search api not found
app.all("*", () => {
  res.send("404 not found of API SEARCH");
});

mongo
  .connect(
    "mongodb+srv://<yourname>:<yourpassword>@cluster0.ozll2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connect to mongoDb Success");
    app.listen(PORT, () => {
      console.log(`HELLO SERVER localhost:${PORT}`);
    });
  }).catch((error) => {
	  console.log(`Connect MongoDB Failed ${error}`)
  })

// TEST port
// const HOST_NAME = process.env.HOST_NAME || 'localhost'

// app.listen(PORT, 'localhost', () => {
// 	console.log('HI PAGE ')
// })
