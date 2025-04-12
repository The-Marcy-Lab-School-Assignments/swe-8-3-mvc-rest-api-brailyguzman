const User = require('../models/User.js');

const getUsersController = (req, res) => {
  const users = User.list();

  return res.status(200).json({ users });
};

const getUserController = (req, res) => {
  const { id } = req.params;

  if (!id > 0) {
    return res.status(400).json({ error: 'Please provide a valid ID' });
  }

  const foundUser = User.find(Number(id));

  if (!foundUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json({ user: foundUser });
};

const newUserController = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Please provide a name and email' });
  }

  const createdUser = User.create(name, email);

  res
    .status(201)
    .json({ message: 'Successfully created user', user: createdUser });
};

const editUserController = (req, res) => {
  console.log('patching user');
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Invalid Email');
  }

  const { id } = req.params;

  const editedUser = User.edit(Number(id), email);

  if (!editedUser) {
    console.log('user was not edited');
    return res.status(404).json({ error: 'User not found' });
  }

  console.log('reached end');
  res.status(204).send({ editedUser });
};

const deleteUserController = (req, res) => {
  const { id } = req.params;

  if (!id || Number(id) <= 0) {
    return res.status(400).json({ error: 'Please provide a valid ID' });
  }

  const deletedUser = User.delete(Number(id));

  if (!deletedUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(204).json({ message: 'User deleted successfully' });
};

module.exports = {
  getUsersController,
  getUserController,
  newUserController,
  editUserController,
  deleteUserController,
};
