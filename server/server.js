require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const postRouter = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/conversation');
const messageRoutes = require('./routes/messages');
const ArtistRoutes=require('./routes/artists')
const app = express();
const bodyparser = require('body-parser');
const PORT = 4000;

app.use(cors());
app.use(express.static('public'));
app.use(bodyparser.json());
app.use(express.json());  // Add this line to handle JSON data
app.use(express.urlencoded({ extended: true }));  // Add this line to handle form data

app.use('/posts', postRouter);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/conversations", chatRoutes);
app.use('/messages', messageRoutes);
app.use('/Artist', ArtistRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

mongoose.connect('mongodb://127.0.0.1:27017/Mern-SocialApp')
  .then(() => console.log('Connected!'))
  .catch((error) => console.error('Connection error:', error));

module.exports = app;
