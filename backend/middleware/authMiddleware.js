import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import SuperAdmin from '../models/SuperAdmin.js';
import SubUser from '../models/SubUser.js';

export const authenticateSuperAdmin = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid format' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token received:', token); // Debug log

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Debug log

    const superAdmin = await SuperAdmin.findById(decoded.id);
    console.log('SuperAdmin Found:', superAdmin); // Debug log

    if (!superAdmin) {
      return res.status(401).json({ message: 'Invalid token: SuperAdmin not found' });
    }

    req.superAdmin = superAdmin;
    req.token = token; // Attach token to request
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const authenticateSubUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const subUser = await SubUser.findById(decoded.id);

    if (!subUser) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.subUser = subUser;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log('Extracted Token:', token); // Debug log

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded); // Debug log

      // Get user from token
      req.user = await SubUser.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.superAdmin.role)) { // Adjusted to req.superAdmin
      return res
        .status(403)
        .json({ message: `Role '${req.superAdmin.role}' not authorized` });
    }
    next();
  };
};