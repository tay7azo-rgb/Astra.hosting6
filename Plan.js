const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  ram: Number,
  storage: Number,
  bots: Number
});

module.exports = mongoose.model('Plan', PlanSchema);