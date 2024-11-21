import SubUser from '../models/SubUser.js';
import moment from 'moment';

// Controller to create a new sub user
export const createSubUser = async (req, res) => {
  const formData = req.body;
  formData.role = formData.userHierarchy; // Set role based on userHierarchy
  const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}` : null;

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
    }
  }

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

// Controller to get a sub user by ID
export const getSubUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const subUser = await SubUser.findById(id);
    if (!subUser) {
      console.error('SubUser not found with ID:', id);
      return res.status(404).json({ message: 'SubUser not found' });
    }
    console.log('SubUser data:', subUser); // Log the subUser data on the server
    res.status(200).json(subUser); // Send the full subUser object
  } catch (error) {
    console.error('Error fetching SubUser:', error);
    res.status(500).json({ message: 'Error fetching SubUser' });
  }
};

// Controller to update a sub user
export const updateSubUser = async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  // Process deactivationTime
  if (formData.deactivationTime) {
    if (typeof formData.deactivationTime === 'string') {
      const deactivationTimeStr = formData.deactivationTime; // Ensure it's a string
      const daysMatch = deactivationTimeStr.match(/(\d+)\s*days?/i);
      if (daysMatch) {
        const days = parseInt(daysMatch[1]);
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);
        formData.deactivationTime = {
          string: `${days} days`,
          date: futureDate.toISOString(),
        };
      }
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