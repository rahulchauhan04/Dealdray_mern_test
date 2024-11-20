import SubUser from '../models/SubUser.js';

export const createSubUser = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    // Check if a SubUser with the given email already exists
    const existingSubUser = await SubUser.findOne({ email });
    if (existingSubUser) {
      return res.status(400).json({ message: 'SubUser with this email already exists' });
    }

    // Create a new SubUser with the provided details
    const subUser = new SubUser({ name, email, role });

    // Save the SubUser
    await subUser.save();

    // Return a success message and the created SubUser
    res.status(201).json({ message: 'SubUser created successfully', subUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};