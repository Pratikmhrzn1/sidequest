// src/controllers/visaController.js
import VisaByOrigin from '../models/VisaByOrigin.js';


export const getVisaInfo = async (req, res) => {
  try {
    // Get query parameters (optional - for filtering if needed)
    const { nationality, destination } = req.query;

    let doc = await VisaByOrigin.findOne();

    if (!doc) {
      console.log("No visa info found → creating default document...");

      doc = await VisaByOrigin.create({
        origin: [
          {
            country: "Nepal",
            nationality: "Nepal",
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
              },
              {
                country: "India",
                details: {
                  type: "string",
                  text: "Nepalese citizens do not require a visa to enter India. An open border policy exists between Nepal and India."
                }
              }
            ]
          }
        ]
      });

      console.log("✅ Default visa data created successfully");
    }
    let responseData = { origin: doc.origin };

    if (nationality && destination) {
      const originData = doc.origin.find(o => 
        o.country.toLowerCase() === nationality.toLowerCase() || 
        o.nationality.toLowerCase() === nationality.toLowerCase()
      );

      if (originData) {
        const destData = originData.destination.find(d => 
          d.country.toLowerCase() === destination.toLowerCase()
        );

        if (destData) {
          responseData = {
            origin: [{
              country: originData.country,
              nationality: originData.nationality,
              destination: [destData]
            }]
          };
        } else {
          return res.status(404).json({
            success: false,
            message: `No visa information found for ${nationality} → ${destination}`
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: `No visa information found for nationality: ${nationality}`
        });
      }
    }

    res.json({
      success: true,
      data: responseData
    });

  } catch (error) {
    console.error("❌ Error in getVisaInfo:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Optional: Add a new visa entry
export const addVisaInfo = async (req, res) => {
  try {
    // Debug logging
    // console.log('=== POST /visa Request ===');
    // console.log('Content-Type:', req.headers['content-type']);
    // console.log('Body received:', JSON.stringify(req.body, null, 2));
    // console.log('Body type:', typeof req.body);
    // console.log('Body keys:', req.body ? Object.keys(req.body) : 'null/undefined');

    const { origin, country, nationality, destination, details } = req.body;

    // Check if body is empty or undefined
    if (!req.body || (typeof req.body === 'object' && Object.keys(req.body).length === 0)) {
      return res.status(400).json({
        success: false,
        message: "Request body is empty. Please send JSON data with Content-Type: application/json header",
        hint: "Make sure you're sending: { 'nationality': '...', 'destination': '...', 'details': {...} }"
      });
    }

    // Use origin if provided, otherwise use country or nationality as origin
    const originCountry = origin || country || nationality;

    // Handle two formats:
    // Format 1: { nationality: "India", destination: "Japan", details: {...} }
    // Format 2: { nationality: "India", destination: [{ country: "Japan", details: {...} }] }
    let destinationsToProcess = [];

    if (Array.isArray(destination)) {
      // Format 2: destination is an array
      if (destination.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Destination array cannot be empty"
        });
      }
      destinationsToProcess = destination.map(dest => ({
        country: dest.country,
        details: dest.details
      }));
    } else if (typeof destination === 'string' && details) {
      // Format 1: destination is a string, details is separate
      destinationsToProcess = [{
        country: destination,
        details: details
      }];
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid format. Expected either: { nationality, destination: 'string', details } OR { nationality, destination: [{ country, details }] }",
        received: {
          nationality: nationality || 'MISSING',
          destination: destination || 'MISSING',
          details: details ? 'PRESENT' : 'MISSING',
          origin: originCountry || 'NOT PROVIDED (optional)',
          allBodyKeys: Object.keys(req.body || {})
        }
      });
    }

    if (!nationality) {
      return res.status(400).json({
        success: false,
        message: "Missing required field: nationality"
      });
    }

    let doc = await VisaByOrigin.findOne();
    
    if (!doc) {
      doc = await VisaByOrigin.create({ origin: [] });
    }

    // Find or create origin country using index for proper Mongoose tracking
    let originIndex = doc.origin.findIndex(o => 
      o.country.toLowerCase() === originCountry.toLowerCase() ||
      o.nationality.toLowerCase() === nationality.toLowerCase()
    );

    if (originIndex === -1) {
      // Create new origin entry
      doc.origin.push({
        country: originCountry,
        nationality: nationality,
        destination: []
      });
      originIndex = doc.origin.length - 1;
    } else {
      // Update existing origin entry
      if (doc.origin[originIndex].nationality.toLowerCase() !== nationality.toLowerCase()) {
        doc.origin[originIndex].nationality = nationality;
      }
      if (origin && doc.origin[originIndex].country.toLowerCase() !== originCountry.toLowerCase()) {
        doc.origin[originIndex].country = originCountry;
      }
    }

    // Add or update destinations (handle multiple destinations if array was provided)
    destinationsToProcess.forEach(({ country: destCountry, details: destDetails }) => {
      if (!destCountry || !destDetails) {
        console.warn(`Skipping invalid destination: country=${destCountry}, details=${!!destDetails}`);
        return;
      }

      const destIndex = doc.origin[originIndex].destination.findIndex(d => 
        d.country.toLowerCase() === destCountry.toLowerCase()
      );

      if (destIndex >= 0) {
        // Update existing destination
        doc.origin[originIndex].destination[destIndex].details = destDetails;
      } else {
        // Add new destination
        doc.origin[originIndex].destination.push({
          country: destCountry,
          details: destDetails
        });
      }
    });

    // Mark as modified for Mongoose to detect nested array changes
    doc.markModified('origin');
    await doc.save();

    console.log('✅ Visa info saved successfully');

    res.json({
      success: true,
      message: "Visa information added/updated successfully",
      data: doc
    });

  } catch (error) {
    console.error("❌ Error in addVisaInfo:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Get visa info by origin, nationality, and destination (route parameters)
export const getVisaInfoByOriginAndNationalityAndDestination = async (req, res) => {
  try {
    const { origin, nationality, destination } = req.params;

    if (!origin || !nationality || !destination) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters: origin, nationality, destination"
      });
    }

    // Find the visa document
    let doc = await VisaByOrigin.findOne();

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "No visa information found in database"
      });
    }

    // Find origin that matches nationality (since nationality is the key identifier)
    // Also check if origin (country) matches as a fallback
    const originData = doc.origin.find(o => 
      o.nationality.toLowerCase() === nationality.toLowerCase() ||
      o.country.toLowerCase() === nationality.toLowerCase() ||
      o.country.toLowerCase() === origin.toLowerCase()
    );

    if (!originData) {
      return res.status(404).json({
        success: false,
        message: `No visa information found for origin: ${origin} and nationality: ${nationality}`
      });
    }

    // Find destination within the origin data
    const destData = originData.destination.find(d => 
      d.country.toLowerCase() === destination.toLowerCase()
    );

    if (!destData) {
      return res.status(404).json({
        success: false,
        message: `No visa information found for ${origin}/${nationality} → ${destination}`
      });
    }

    // Return filtered data
    const responseData = {
      origin: [{
        country: originData.country,
        nationality: originData.nationality,
        destination: [destData]
      }]
    };

    res.json({
      success: true,
      data: responseData
    });

  } catch (error) {
    console.error("❌ Error in getVisaInfoByOriginAndNationalityAndDestination:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};