const express = require("express");
const usersRouter = express.Router();

const { addUser, authenticateUser } = require("../controllers/users");

usersRouter.route("/addUser").post(addUser);
usersRouter.route("/authenticateUser").post(authenticateUser);

module.exports = usersRouter;
