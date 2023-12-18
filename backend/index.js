const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const usersRouter = require("./routes/users");

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors())

app.use("/api/v1/users", usersRouter);

const start = async() => {
   try {
      await mongoose.connect(process.env.MONGODB_URI);
      app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
   } catch (error) {
      console.log(error);
   }
}

start();