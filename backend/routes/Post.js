const router = require("express").Router();
const { createPost, getPosts, getPostById, updatePost } = require("../controllers/Posts");

//Create Post 
router.post("/",  createPost)

//Get Post
router.get("/", getPosts)

//Get Post By Id
router.get("/:id", getPostById)

//Edit Post
router.put("/", updatePost)

module.exports = router