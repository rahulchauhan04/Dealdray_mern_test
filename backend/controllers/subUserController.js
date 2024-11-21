import axios from 'axios';
import Buyer from '../models/Buyer.js';
import SubUser from '../models/SubUser.js';
import moment from 'moment';

export const getBuyerRegistrations = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Retrieve buyer registrations
    const buyers = await Buyer.find()
      .sort({ registrationDate: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count
    const total = await Buyer.countDocuments();

    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      buyers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveBuyerRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const buyer = await Buyer.findById(id);

    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    buyer.status = 'Approved';
    buyer.approvedBy = req.user._id;
    buyer.approvalDate = Date.now();
    await buyer.save();

    res.status(200).json({ message: 'Buyer registration approved', buyer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectBuyerRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const buyer = await Buyer.findById(id);

    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    buyer.status = 'Rejected';
    buyer.rejectedBy = req.user._id;
    buyer.rejectionDate = Date.now();
    await buyer.save();

    res.status(200).json({ message: 'Buyer registration rejected', buyer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to create a new sub user
export const createSubUser = async (req, res) => {
  const formData = req.body;
  const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}` : null;

  try {
    // Check if email already exists
    const existingSubUser = await SubUser.findOne({ email: formData.email });
    if (existingSubUser) {
      return res.status(400).json({ message: 'SubUser with this email already exists' });
    }

    // Create new SubUser with all formData fields
    const subUser = new SubUser({ ...formData, image: imageUrl });

    await subUser.save();

    res.status(201).json({ message: 'SubUser created successfully', subUser });
  } catch (error) {
    console.error('Error creating SubUser:', error);
    res.status(500).json({ message: 'Error creating SubUser' });
  }
};

// Controller to update a sub user
export const updateSubUser = async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  // Process deactivationTime
  if (formData.deactivationTime) {
    const deactivationTimeStr = String(formData.deactivationTime); // Ensure it's a string
    const daysMatch = deactivationTimeStr.match(/(\d+)\s*days?/i);
    if (daysMatch) {
      const days = parseInt(daysMatch[1]);
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + days);
      formData.deactivationTime = {
        string: `${days} days`,
        date: futureDate.toISOString(),
      };
    } else if (typeof formData.deactivationTime === 'object') {
      // If deactivationTime is already an object, use it directly
      formData.deactivationTime = {
        string: formData.deactivationTime.string,
        date: formData.deactivationTime.date,
      };
    }
  }

  if (req.file) {
    formData.image = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`;
  }

  try {
    const subUser = await SubUser.findByIdAndUpdate(id, formData, { new: true });

    if (!subUser) {
      return res.status(404).json({ message: 'SubUser not found' });
    }

    res.status(200).json({ message: 'SubUser updated successfully', subUser });
  } catch (error) {
    console.error('Error updating SubUser:', error);
    res.status(500).json({ message: 'Error updating SubUser' });
  }
};