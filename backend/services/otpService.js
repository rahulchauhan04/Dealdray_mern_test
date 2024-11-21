// backend/services/otpService.js

import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export default client;

// In-memory store for OTPs
const otpStore = {};

export const generateOTP = (phoneNumber) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

  otpStore[formattedPhoneNumber] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // Expires in 5 minutes
  };

  return otp;
};

export const sendOTP = async (phoneNumber) => {
  try {
    // Generate a random 6-digit OTP
    const otp = generateOTP(phoneNumber);

    // Ensure phone number is in E.164 format
    const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

    // Send OTP via SMS
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: '+1 815 923 0384', // Your Twilio number in E.164 format
      to: formattedPhoneNumber
    });

    console.log(`OTP ${otp} sent to ${formattedPhoneNumber}`);
  } catch (error) {
    console.error(`Failed to send OTP to ${phoneNumber}:`, error);
    throw new Error('Failed to send OTP');
  }
};

// Function to verify OTP
export const verifyOTP = (phoneNumber, enteredOTP) => {
  const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
  const record = otpStore[formattedPhoneNumber];

  if (!record) {
    return { success: false, message: 'OTP not found. Please request a new one.' };
  }

  if (Date.now() > record.expiresAt) {
    delete otpStore[formattedPhoneNumber];
    return { success: false, message: 'OTP has expired. Please request a new one.' };
  }

  if (record.otp === enteredOTP) {
    delete otpStore[formattedPhoneNumber];
    return { success: true, message: 'OTP verified successfully.' };
  } else {
    return { success: false, message: 'Invalid OTP. Please try again.' };
  }
};