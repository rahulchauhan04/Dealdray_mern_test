import Buyer from '../models/Buyer.js';
import { sendOTP } from '../services/otpService.js'; // Assuming you have an OTP service

export const loginBuyerWithOTP = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Check if the buyer exists
    let buyer = await Buyer.findOne({ phoneNumber });

    if (!buyer) {
      // If the buyer is new, create a new buyer entry
      buyer = new Buyer({ phoneNumber });
      await buyer.save();

      // Send OTP to the new buyer
      await sendOTP(phoneNumber);

      // Return a response indicating a new user
      return res.status(200).json({ message: 'OTP sent to new user', newUser: true });
    }

    // If the buyer exists, send OTP
    await sendOTP(phoneNumber);

    // Return a response indicating an existing user
    res.status(200).json({ message: 'OTP sent to existing user', newUser: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};