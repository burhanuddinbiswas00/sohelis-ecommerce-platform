const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sohelis_db';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.warn(`[Database] MongoDB connection warning: ${err.message}`);
    console.warn(`[Database] Please ensure MongoDB is running at ${uri} for persistent storage.`);
    // Don't exit process so server can stay responsive for health checks & testing
    return null;
  }
};

module.exports = connectDB;
