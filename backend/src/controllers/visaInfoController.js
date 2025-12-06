// src/controllers/visaController.js
import VisaByOrigin from '../models/VisaByOrigin.js';

export const getVisaInfo = async (req, res) => {
  try {
    let doc = await VisaByOrigin.findOne();
    if (!doc) {
      console.log("No visa info found → creating default Nepal example...");

      doc = await VisaByOrigin.create({
        origin: [
          {
            country: "Nepal",
            destination: [
              {
                country: "India",
                details: {
                  type: "string",
                  text: "Open border – no visa required"
                }
              },
            ]
          },
          {
            country:"India",
            destination: [
              {
                country: "United States",
                details: {
                  type: "list",
                  text: ["Visa required","Return ticket required","Hotel Booking required"]
                }
              },
            ]
          }
        ]
      });

    }
    

    res.json({
      success: true,
      data: { origin: doc.origin }
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};