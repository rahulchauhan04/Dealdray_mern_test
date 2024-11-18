import Business from "../models/Business.js";

// Get All Businesses
export const getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a New Business
export const createBusiness = async (req, res) => {
  const { name, ownerName, mobile, email, category } = req.body;
  const documents = req.files?.map((file) => file.path) || []; // Handle empty uploads

  try {
    const business = new Business({ name, ownerName, mobile, email, category, documents });
    await business.save();
    res.status(201).json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update a Business by ID
export const updateBusiness = async (req, res) => {
  const { id } = req.params;
  const { name, ownerName, mobile, email, category } = req.body;
  const newDocuments = req.files?.map((file) => file.path) || [];

  try {
    const updateFields = {};

    // Update provided fields
    if (name) updateFields.name = name;
    if (ownerName) updateFields.ownerName = ownerName;
    if (mobile) updateFields.mobile = mobile;
    if (email) updateFields.email = email;
    if (category) updateFields.category = category;

    // Append new documents if any
    if (newDocuments.length > 0) {
      updateFields.$push = { documents: { $each: newDocuments } };
    }

    const business = await Business.findByIdAndUpdate(id, updateFields, { new: true });

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Business by ID
export const deleteBusiness = async (req, res) => {
  const { id } = req.params;
  try {
    const business = await Business.findByIdAndDelete(id);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.status(200).json({ message: "Business deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
