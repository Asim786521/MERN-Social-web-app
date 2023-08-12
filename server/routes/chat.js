
 const express = require('express')
 const app=express()
 
const route=express.Router()
const cors = require("cors");
const http = require('http');
app.use(cors());
 
 
const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});



module.exports=route;