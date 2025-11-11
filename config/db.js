const mongoose = require("mongoose");

let isConnected = false; // ✅ prevent multiple connections

const DBconnect = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000, // Wait 5s before timing out
      connectTimeoutMS: 10000,
    });
    isConnected = conn.connections[0].readyState;
    console.log("✅ MongoDB connected successfully:", conn.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

module.exports = { DBconnect };
