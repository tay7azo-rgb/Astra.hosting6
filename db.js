const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/astra-hosting');
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ Database Error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;