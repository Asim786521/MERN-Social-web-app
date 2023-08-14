const route = require("express").Router();
const Message = require("../models/chats");

//add

route.post("/", async (req, res) => {
  const newMessage = new Message.chatMessages(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

route.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.chatMessages.find({
      conversationId: req.params.conversationId,
    });
    console.log("message check",messages);
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports=route;