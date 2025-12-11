// src/controllers/visaController.js
import VisaByOrigin from '../models/VisaByOrigin.js';

export const getVisaInfo = async (req, res) => {
  try {
    let doc = await VisaByOrigin.findOne();

    if (!doc) {
      console.log("No visa info found → creating default document...");

      doc = await VisaByOrigin.create({
        origin: [
          {
            country: "Nepal",
            destination: [
              {
                country: "Japan",
                details: {
                  type: "list",
                  text: [
                    "Valid Nepalese passport (at least 6 months validity).",
                    "Submit visa application via VFS Global.",
                    "Passport-size photograph and completed visa form.",
                    "Flight booking, hotel reservation, travel itinerary.",
                    "Bank statements as proof of funds.",
                    "Certificate of Eligibility required for long-term visas.",
                    "Only original documents are accepted."
                  ]
                }
              },
              {
                country: "South Korea",
                details: {
                  type: "list",
                  text: [
                    "Machine-readable passport required.",
                    "Visa application submitted in person with an appointment.",
                    "Recent passport photo and completed form.",
                    "Round-trip flight reservation and hotel booking.",
                    "6 months of bank statements.",
                    "Employer or business documents if employed.",
                    "Processing time is around 21 working days."
                  ]
                }
              },
              {
                country: "Singapore",
                details: {
                  type: "list",
                  text: [
                    "Submit Singapore Arrival Card (mandatory).",
                    "Valid Nepalese passport.",
                    "Return or onward flight ticket.",
                    "Hotel booking or accommodation proof.",
                    "Sufficient funds to support stay.",
                    "Visa-free entry may apply under certain conditions."
                  ]
                }
              },
              {
                country: "United Arab Emirates",
                details: {
                  type: "list",
                  text: [
                    "Valid Nepalese passport.",
                    "Visa depends on purpose (tourist, visit, work).",
                    "Round-trip flight booking required.",
                    "Accommodation proof (hotel or host invitation).",
                    "Proof of sufficient funds.",
                    "Travel insurance recommended.",
                    "Work visas require employer sponsorship."
                  ]
                }
              }
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
