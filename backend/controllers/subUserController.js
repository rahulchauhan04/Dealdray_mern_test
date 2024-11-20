import axios from 'axios';
import Buyer from '../models/Buyer.js';

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