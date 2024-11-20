import Business from '../models/Business.js'; // Ensure this path is correct

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
  const documents = req.files.map(file => file.path);

  try {
    const business = new Business({ name, ownerName, mobile, email, category, documents });
    await business.save();
    res.status(201).json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};