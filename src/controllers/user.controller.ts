import { Request, Response } from 'express';
import Twilio from 'twilio';
import User from '../models/User';
import { generateVerificationCode } from '../utils/index';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = Twilio(accountSid, authToken);

// @route GET /api/user/verify/phone/
// @desc Get verification code from server and send to user phone number
// @access Private
const sendVerificationSMS = async (req: Request, res: Response) => {
  try {
    const { id } = req.body.user;
    const user = await User.findById(id).select('-password');
    if (user && user.phone) {
      let phone = '+91' + String(user.phone);
      let verificationCode = generateVerificationCode(6);
      let verificationMessage = await twilioClient.messages.create({
        body: `Your verification code for social app is: ${verificationCode}`,
        from: process.env.TWILIO_SENDER_NUMBER,
        to: phone,
      });
      return res.json({
        message: 'Verification Code sent successfully',
        code: verificationCode,
        verificationMessage,
        success: true,
      });
    }
    res.json({ message: "User doesn't have phone number", success: false });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// @route POST /api/user/verify/phone
// @desc Validate verification code and verify user
// @access Private
const verifyPhone = async (req: Request, res: Response) => {
  try {
    const { id } = req.body.user;
    const user = await User.findById(id).select('-password');
    if (user && user.phone) {
      const { inputCode, serverCode } = req.body;
      if (inputCode === serverCode) {
        user.isPhoneVerified = true;
        await user.save();
        return res.json({ message: 'Phone number verified', success: true });
      }
      res.json({ message: 'Invalid verification code', success: false });
    }
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

export { sendVerificationSMS, verifyPhone };
