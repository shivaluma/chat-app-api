const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  firstId: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true
  },
  secondId: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true
  },
  messages: [
    {
      content: String,
      ofUser: Schema.Types.ObjectId,
      time: Date.now
    }
  ],
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});

const Conversation = mongoose.model('Conversation', ConversationSchema);
module.exports = Conversation;
