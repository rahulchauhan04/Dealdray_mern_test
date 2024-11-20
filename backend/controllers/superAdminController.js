import SubUser from '../models/SubUser.js';

// Controller to create a new sub user
export const createSubUser = async (req, res) => {
  const formData = req.body;

  try {
    // Check if email already exists
    const existingSubUser = await SubUser.findOne({ email: formData.email });
    if (existingSubUser) {
      return res.status(400).json({ message: 'SubUser with this email already exists' });
    }

    // Create new SubUser with all formData fields
    const subUser = new SubUser(formData);

    await subUser.save();

    res.status(201).json({ message: 'SubUser created successfully', subUser });
  } catch (error) {
    console.error('Error creating SubUser:', error);
    res.status(500).json({ message: 'Error creating SubUser' });
  }
};

// Controller to get all sub users
export const getSubUsers = async (req, res) => {
  try {
    const subUsers = await SubUser.find();
    res.status(200).json({ subUsers });
  } catch (error) {
    console.error('Error fetching SubUsers:', error);
    res.status(500).json({ message: 'Error fetching SubUsers' });
  }
};

// Controller to update a sub user
export const updateSubUser = async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

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

// Controller to delete a sub user
export const deleteSubUser = async (req, res) => {
  const { id } = req.params;

  try {
    const subUser = await SubUser.findByIdAndDelete(id);

    if (!subUser) {
      return res.status(404).json({ message: 'SubUser not found' });
    }

    res.status(200).json({ message: 'SubUser deleted successfully' });
  } catch (error) {
    console.error('Error deleting SubUser:', error);
    res.status(500).json({ message: 'Error deleting SubUser' });
  }
};