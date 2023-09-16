const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const salt = bcrypt.genSaltSync(10);



const app = express();

//middlewares
app.use(express.json());
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))

const createUsers = require("./routes/Register");
const userLogin = require("./routes/Login")
const post = require('./routes/Post')


//routes
app.use('/register', createUsers)
app.use('/login', userLogin)
app.use('/post', post)

// db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`listening on port ${PORT}`));