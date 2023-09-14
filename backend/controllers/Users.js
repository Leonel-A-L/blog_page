const Users = require("../models/Users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const saltRounds = 10; // Define the number of salt rounds
const secret = 'sdwadasdasdasdwqd23314234de3c322f3'

// Create Users
async function createUsers(req, res) {
  try {
    const { username, password } = req.body;

    // Generate a salt and hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userDoc = await Users.create({
      username,
      password: hashedPassword, // Store the hashed password
    });

    res.status(201).json({ message: "User Created", userDoc });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error Creating User" });
  }
}

// User Login
async function userLogin(req, res) {
  const { username, password } = req.body;
  try {
    const userDoc = await Users.findOne({ username });
    
    if (!userDoc) {
      // User not found
      res.status(404).json({ message: "User not found" });
      return;
    }

    const passOk = await bcrypt.compare(password, userDoc.password); // Comparing passwords

    if (passOk) {
      // Passwords match, user is authenticated
      jwt.sign({username,id:userDoc.id},secret, {},(err,token) =>{
        if(err) throw err;
        res.cookie('token',token).json({
        id:userDoc._id,
        username,
        })
      })
    } else {
      // Passwords do not match
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error Getting User" });
  }
}

async function checkIfUserLogedIn(req, res) {
    try {
      const { token } = req.cookies;
      console.log('token', token);
  
      const info = await new Promise((resolve, reject) => {
        jwt.verify(token, secret, {}, (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(info);
          }
        });
      });
  
      res.json(info);
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Authentication failed" });
    }
  }

async function userLogout(req,res) {
    res.cookie('token','').json('ok')
}

module.exports = {
  createUsers,
  userLogin,
  checkIfUserLogedIn,
  userLogout
};