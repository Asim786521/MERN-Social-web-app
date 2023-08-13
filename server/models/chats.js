const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);
const MessageSchema = new mongoose.Schema(
    {
      conversationId: {
        type: String,
      },
      sender: {
        type: String,
      },
      text: {
        type: String,
      },
    },
    { timestamps: true }
  );

  const conversation = mongoose.model('conversation', ConversationSchema);
const chatMessages = mongoose.model('chatMessages', MessageSchema);
