const mongoose = require('mongoose');

const BotServiceSchema = new mongoose.Schema({
  userId: String,
  planId: Number,
  botName: String,
  filePath: String,
  status: { type: String, default: 'stopped' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BotService', BotServiceSchema);