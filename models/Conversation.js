const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ConversationSchema = new Schema({
  key: {
    type: String,
    unique: true,
    required: true
  },
  messages: [
    {
      content: String,
      ofUser: Schema.Types.ObjectId,
      time: Date.now
    }
  ]
});

const Conversation = mongoose.model('Conversation', ConversationSchema);
module.exports = Conversation;
