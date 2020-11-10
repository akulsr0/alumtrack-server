import { Request, Response } from 'express';
import Twilio from 'twilio';
import User from '../models/User';
import { generateVerificationCode } from '../utils/index';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = Twilio(accountSid, authToken);

// @route  GET /api/user/:userid
// @desc  Get User's data from their user id
// @access Public
const getUserData = async (req: Request, res: Response) => {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid);
    if (user) {
      return res.json({ user, success: true });
    }
    res.json({ message: 'User not found', success: false });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// @route POST /api/user/connection/add/:userid
// @desc Send connection request to User
// @access Private
const addConnection = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.body.user.id;
    const { userid } = req.params;
    const currentUser = await User.findById(currentUserId);
    const user = await User.findById(userid);
    if (String(userid) === String(currentUserId)) {
      return res.json({
        message: 'Cannot send request to yourself',
        success: false,
      });
    }
    if (!currentUser) {
      return res.json({ message: 'No current user', success: false });
    }
    if (!user) {
      return res.json({ message: 'Invalid User Id', success: false });
    }
    if (
      currentUser.connections.requests_received.includes(userid) &&
      user.connections.requests_sent.includes(currentUserId)
    ) {
      currentUser.connections.requests_received = currentUser.connections.requests_received.filter(
        (reqId) => String(reqId) !== String(userid)
      );
      user.connections.requests_sent = user.connections.requests_sent.filter(
        (reqId) => String(reqId) !== String(currentUserId)
      );
      currentUser.connections.users.push(userid);
      user.connections.users.push(currentUserId);
      await currentUser.save();
      await user.save();
      return res.json({
        message: `${currentUser.username} accepted ${user.username} connection request`,
        success: false,
      });
    }
    if (
      currentUser.connections.requests_sent.includes(userid) &&
      user.connections.requests_received.includes(currentUserId)
    ) {
      return res.json({
        message: `${currentUser.username} already sent connection request to ${user.username}`,
        success: false,
      });
    }
    if (
      currentUser.connections.users.includes(userid) &&
      user.connections.users.includes(currentUserId)
    ) {
      return res.json({
        message: `${currentUser.username} and ${user.username} are already connected.`,
        success: false,
      });
    }
    currentUser.connections.requests_sent.push(userid);
    user.connections.requests_received.push(currentUserId);
    await currentUser.save();
    await user.save();
    res.json({
      message: `${currentUser.username} sent a connection request to ${user.username}`,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// @route api/user/connection/accept/:userid
// @desc Accept User friend Request
// @access Private
const acceptConnection = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.body.user.id;
    const { userid } = req.params;
    const currentUser = await User.findById(currentUserId);
    const user = await User.findById(userid);
    if (!currentUser) {
      return res.json({ message: 'No current user', success: false });
    }
    if (!user) {
      return res.json({ message: 'Invalid User Id', success: false });
    }
    if (!currentUser.connections.requests_received.includes(userid)) {
      return res.json({
        message: `${currentUser.username} has not received request from ${user.username}`,
        success: false,
      });
    }
    if (!user.connections.requests_sent.includes(currentUserId)) {
      return res.json({
        message: `${user.username} has not sent request to ${currentUser.username}`,
        success: false,
      });
    }
    currentUser.connections.requests_received = currentUser.connections.requests_received.filter(
      (reqId) => String(reqId) !== String(userid)
    );
    user.connections.requests_sent = user.connections.requests_sent.filter(
      (reqId) => String(reqId) !== String(currentUserId)
    );
    currentUser.connections.users.push(userid);
    user.connections.users.push(currentUserId);
    await currentUser.save();
    await user.save();
    res.json({
      message: `${currentUser.username} accepted ${user.username} connection request`,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// @route api/user/connection/reject/:userid
// @desc Reject User friend Request
// @access Private
const rejectConnection = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.body.user.id;
    const { userid } = req.params;
    const currentUser = await User.findById(currentUserId);
    const user = await User.findById(userid);
    if (!currentUser) {
      return res.json({ message: 'No current user', success: false });
    }
    if (!user) {
      return res.json({ message: 'Invalid User Id', success: false });
    }
    if (!currentUser.connections.requests_received.includes(userid)) {
      return res.json({
        message: `${currentUser.username} has not received request from ${user.username}`,
        success: false,
      });
    }
    if (!user.connections.requests_sent.includes(currentUserId)) {
      return res.json({
        message: `${user.username} has not sent request to ${currentUser.username}`,
        success: false,
      });
    }
    currentUser.connections.requests_received = currentUser.connections.requests_received.filter(
      (reqId) => String(reqId) !== String(userid)
    );
    user.connections.requests_sent = user.connections.requests_sent.filter(
      (reqId) => String(reqId) !== String(currentUserId)
    );
    await currentUser.save();
    await user.save();
    res.json({
      message: `${currentUser.username} rejected ${user.username} connection request`,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

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

export {
  getUserData,
  addConnection,
  acceptConnection,
  rejectConnection,
  sendVerificationSMS,
  verifyPhone,
};
