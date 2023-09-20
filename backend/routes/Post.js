const router = require("express").Router();
const { createPost, getPosts, getPostById, updatePost, deletePost } = require("../controllers/Posts");

//Create Post 
router.post("/",  createPost)

//Get Post
router.get("/", getPosts)

//Get Post By Id
router.get("/:id", getPostById)

//Edit Post
router.put("/", updatePost)

//Delete Post
router.delete("/:id", deletePost)

module.exports = router