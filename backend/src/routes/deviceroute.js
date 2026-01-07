// src/routes/deviceRoutes.js
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Define schema and model (inside the file or import from models)
const deviceLogSchema = new mongoose.Schema({
  brand: String,
  manufacturer: String,
  modelName: String,
  deviceName: String,
  osName: String,
  osVersion: String,
  isDevice: Boolean,
  deviceType: String,
  timestamp: Date,
  appVersion: String
}, { timestamps: true });

const DeviceLog = mongoose.models.DeviceLog || mongoose.model('DeviceLog', deviceLogSchema);

router.post('/device-log', async (req, res) => {
  try {
    console.log("Received device log:", req.body); // ← See it in backend console

    const log = new DeviceLog({
      ...req.body
    });

    await log.save(); // ← This saves to MongoDB

    console.log("Device log saved to DB!");

    res.json({ success: true });
  } catch (err) {
    console.error("Save error:", err.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to save device log",
      error: err.message 
    });
  }
});

export default router;