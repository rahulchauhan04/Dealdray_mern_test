// testTwilio.js

import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

client.messages
  .create({
    body: 'Test OTP message',
    from: '+1 815 923 0384', // Replace with your Twilio number
    to: '+919327679806>'      // Replace with a verified phone number
  })
  .then(message => console.log(`Message sent: ${message.sid}`))
  .catch(error => console.error(`Error sending message: ${error.message}`));