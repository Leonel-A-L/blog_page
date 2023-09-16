const router = require("express").Router();
const { createPost, getPosts, getPostById } = require("../controllers/Posts");

//Create Post 
router.post("/",  createPost)

//Get Post
router.get("/", getPosts)

//Get Post By Id
router.get("/:id", getPostById)

module.exports = router