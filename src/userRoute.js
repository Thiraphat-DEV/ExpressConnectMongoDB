const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
// loginPage
const app = express();
const initJwt = "1234";
//require Usermodel
const { User } = require("./model/userModel");

//catch error of middleWare
const errorOfMiddleware = (req, res, next, error) => {
  res.send(error.toString());
};

const encryptPassword = (text) => {
  const salt = bcrypt.getSaltSync(10);
  console.log(salt);
  const encryptText = bcrypt.hashSync(text, salt); // as awit hashed(salt)
  return encryptText;
};

const compareEncryPassword = (text, encryptText) => {
  //return true false
  const compareSyncEncrypt = bcrypt.compareSync(text, encryptText); //as await bcrypt.compare(text, encryptText)
  return compareSyncEncrypt; //if text === encrpyText return true
};
// registerPage
userRouter.post("/register", async (req, res, next) => {
  try {
    const data = req.body; // request from user
    const user = new User({
      username: data.username,
      password: encryptPassword(data.password),
    });

    await user.save(); // save 

    res.json({ // compare to json
      user,
    });
  } catch (error) {
	  next(error) // check error next page
  }
});
 
// loginPage
userRouter.post('/login', async(req, res) => {
	const {username, password} = req.body // request from user

	const user = await User.findOne({username}).exec()
	if(!user) { // no user
		res.status(403).send('USERNAME AND PASSWORD IS WRONG')
		return;
	}

	const passwordMatch = compareEncryPassword(password, user.password)

	if(!passwordMatch) { //password  is not match
		res.status(403).send("PASSWORD ISN'T MATCH")
		return;
	}

	const jwtToken = jwt.sign({userId: user._id}, initJwt) // compare jwtToken 
	res.json({token: jwtToken}) // get token and compare to json
})

userRouter.use(errorOfMiddleware) // check error of Router

module.exports = {userRouter}