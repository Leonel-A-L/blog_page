const router = require("express").Router();
const {
  createUsers
} = require("../controllers/Users");

//Create Users
router.post("/", createUsers);

module.exports = router