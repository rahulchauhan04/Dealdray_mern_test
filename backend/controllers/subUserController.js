import axios from 'axios';
import Buyer from '../models/Buyer.js';

// ...existing code...

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
  const { id } = req.params;

  try {
    // Update the buyer registration status to 'Approved'
    await axios.patch(`https://external-api.com/buyer-registrations/${id}`, {
      status: 'Approved',
    }, {
      headers: {
        Authorization: `Bearer ${req.token}`, // Assuming the token is passed in the request
      },
    });

    // Return a success message
    res.status(200).json({ message: 'Buyer registration approved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectBuyerRegistration = async (req, res) => {
  const { id } = req.params;

  try {
    // Update the buyer registration status to 'Rejected'
    await axios.patch(`https://external-api.com/buyer-registrations/${id}`, {
      status: 'Rejected',
    }, {
      headers: {
        Authorization: `Bearer ${req.token}`, // Assuming the token is passed in the request
      },
    });

    // Return a success message
    res.status(200).json({ message: 'Buyer registration rejected successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};