import { User } from '../models/user.model.js';
import logger from '../config/logger.js';

const getUsers = async (req, res, next) => {
  try {
    const result = await User.find()

    res
      .status(200)
      .setHeader('Content-Type', 'application/json')
      .json(result)
  } catch (err) {
    logger.error(`Error retrieving users: ${err}`);
    res.status(500).json({ message: err.message });
  }
}

const deleteUsers = async (req, res, next) => {
  try {
    await User.deleteMany({});
    res.status(200).json({
      success: true,
      msg: 'All users were deleted'
    });
  } catch (err) {
    logger.error(`Error deleting users: ${err}`);
    res.status(500).json({ message: err.message });
  }
};

const postUser = async (req, res, next) => {
  try {
    const result = await User.create(req.body)

    res
      .status(201)
      .setHeader('Content-Type', 'application/json')
      .json(result)
  } catch (err) {
    logger.error(`Error displaying user: ${err}`);
    res.status(500).json({ message: err.message });
  }
}

const getUser = async (req, res, next) => {
  try {
    const result = await User.findById(req.params.id)
    if (!result) {
      res.status(404)
      throw new Error("User not found.");
    }

    res
      .status(200)
      .setHeader('Content-Type', 'application/json')
      .json(result)
  } catch (err) {
    // throw new Error(`Error retrieving user: ${err.message}`)
    logger.error(`Error retrieving user: ${err}`);
    res.status(500).json({ message: err.message });
  }
}

const putUser = async (req, res, next) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!result) {
      res.status(404)
      throw new Error("User not found.");
    }

    res
      .status(200)
      .setHeader('Content-Type', 'application/json')
      .json(result)
  } catch (err) {
    // throw new Error(`Error updating user: ${err.message}`)
    logger.error(`Error updating user: ${err}`);
    res.status(500).json({ message: err.message });
  }
}

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    await user.remove();

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    logger.error(`Error deleting user: ${err}`);
    res.status(500).json({ message: err.message });
  }
}

export {
  getUsers,
  deleteUsers,
  postUser,
  getUser,
  putUser,
  deleteUser
};
