const router = require("express").Router();
const {
  userLogin, checkIfUserLogedIn
} = require("../controllers/Users");

//User Login
router.post("/", userLogin);

//Check if User Logged In
router.get("/profile", checkIfUserLogedIn)

module.exports = router