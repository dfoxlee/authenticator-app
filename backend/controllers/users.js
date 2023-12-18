const User = require("../models/Users");

const addUser = async (req, res) => {
   const userName = req.body.userName;
   const userPassword = req.body.userPassword;
   const joinDate = new Date();
   const lastLogin = new Date();

   const user = await User.find({userName: userName}).exec();
   if(user.length > 0) {
      return res.status(200).json({
         error: true,
         userName: userName,
         lastLogin: "",
         message: "User already exists",
      })
   }

   const newUser = await User.create({
      userName: userName,
      password: userPassword,
      joinDate: joinDate,
      lastLogin: lastLogin,
   })

   res.status(200).json({
      error: false,
      userName: userName,
      lastLogin: lastLogin,
      message: "User created"
   })
}

const authenticateUser = async (req, res) => {

   const userName = req.body.userName;
   const userPassword = req.body.userPassword;
   const user = await User.find({userName: userName}).exec();
   if(user.length > 0) {
      await User.updateOne({userName: userName}, {lastLogin: new Date()})
      if(user[0].password === userPassword) {
         return res.status(200).json({
            error: false,
            userName: user[0].userName,
            lastLogin: user[0].lastLogin,
            message: 'User authenticated'
         })
      }
      return res.status(200).json({
         error: true,
         userName: userName,
         lastLogin: "",
         message: 'Incorrect username / password'
      })
   }
   res.status(200).json({
      error: true,
      userName: userName,
      lastLogin: '',
      message: 'Incorrect username / password'
   })
}

module.exports = {
   addUser,
   authenticateUser
}