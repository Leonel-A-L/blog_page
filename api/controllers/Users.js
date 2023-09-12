const Users = require("../models/Users");

//Create Users
async function createUsers(req, res) {
    try {
      if (!req.body.image) req.body.image = undefined;
      const users = await new Users(req.body).save();
      const id = users.id;
      res.status(201).json({ message: "User Created", id });
    } catch (error) {
      res.json({ message: "Error Creating User" });
    }
  }

  module.exports = {
    createUsers
  }