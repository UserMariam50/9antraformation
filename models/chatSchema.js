const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: { type: String, required: true },
      sentAt: { type: Date, default: Date.now },
    },
  ],
});


chatSchema.post("save", function (doc, next) {
  console.log("New Chat was created & saved successfully:", doc);
  next();
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
