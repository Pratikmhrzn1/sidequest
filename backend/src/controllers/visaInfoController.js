import VisaInfo from '../models/VisaInfo.js';

export const getVisaInfo = async (req, res) => {
  try {
    let doc = await VisaInfo.findOne();
    if (!doc) {
      doc = await VisaInfo.create({
        nationality: {
          "Pakistan": {
            destination: {
              "Turkey": {
                text: "Pakistani citizens can apply for e-Visa online. Processing time: 1-3 days. Fee: $60.",
                type: "string"
              },
              "United Arab Emirates": {
                text: [
                  "Visa required before travel",
                  "Must have UAE sponsor (hotel, relative, or company)",
                  "90-day tourist visa common"
                ],
                type: "list"
              },
              "Malaysia": {
                text: [
                  "Visa-free for 30 days",
                  "Return ticket required",
                  "Proof of funds may be asked"
                ],
                type: "list"
              }
            },
            passport_and_details: {
              text: [
                "Passport valid for 6+ months from entry date",
                "At least 2 blank pages",
                "2 recent photos (white background)",
                "CNIC copy",
                "Bank statement (recommended)"
              ],
              type: "list"
            }
          },
          "India": {
            destination: {
              "Thailand": {
                text: "Visa on arrival available for 15 days (fee: 2000 THB)",
                type: "string"
              }
            },
            passport_and_details: {
              text: "Indian passport must have minimum 6 months validity and 2 blank pages",
              type: "string"
            }
          }
        }
      });
    }

    // Convert Map → plain JS object
    const result = {
      nationality: Object.fromEntries(
        Array.from(doc.nationality.entries()).map(([country, info]) => [
          country,
          {
            destination: Object.fromEntries(info.destination || new Map()),
            passport_and_details: info.passport_and_details
          }
        ])
      )
    };

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("Error in getVisaInfo:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load visa information"
    });
  }
};