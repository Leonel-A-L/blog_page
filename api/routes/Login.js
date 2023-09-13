const router = require("express").Router();
const {
  userLogin, 
  checkIfUserLogedIn, 
  userLogout
} = require("../controllers/Users");

//Check if User Logged In
router.get("/profile", checkIfUserLogedIn)

//User Login
router.post("/", userLogin);

//User Logout
router.post('/logout',userLogout)

module.exports = router