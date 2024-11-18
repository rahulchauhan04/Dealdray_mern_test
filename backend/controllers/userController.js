import User from "../models/User.js";

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a New User
export const createUser = async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const user = new User({ name, email, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a User by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true } // Return the updated document
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a User by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
