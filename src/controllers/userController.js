const User = require('../models/userModel');

const getUsers       = async (req, res) => { res.json(await User.getAll()); };
const getArchivedUsers = async (req, res) => { res.json(await User.getArchived()); };
const getStats       = async (req, res) => { res.json(await User.getStats()); };

const getUserById = async (req, res) => {
  const user = await User.getById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
  res.json(user);
};

const createUser = async (req, res) => {
  const { name, email, age, genre } = req.body;
  if (!name || !email) return res.status(400).json({ message: 'name et email sont requis' });
  const exists = await User.checkEmail(email);
  if (exists) return res.status(409).json({ message: 'Cet email est déjà utilisé' });
  res.status(201).json(await User.create({ name, email, age, genre }));
};

const updateUser = async (req, res) => {
  const { email } = req.body;
  if (email) {
    const exists = await User.checkEmail(email, req.params.id);
    if (exists) return res.status(409).json({ message: 'Cet email est déjà utilisé' });
  }
  const user = await User.update(req.params.id, req.body);
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
  res.json(user);
};

const deleteUser = async (req, res) => {
  const deleted = await User.remove(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Utilisateur introuvable' });
  res.status(204).send();
};

const archiveUser = async (req, res) => {
  const user = await User.archive(req.params.id);
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
  res.json(user);
};

const restoreUser = async (req, res) => {
  const user = await User.restore(req.params.id);
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
  res.json(user);
};

const checkEmailCtrl = async (req, res) => {
  const { email, excludeId } = req.query;
  if (!email) return res.status(400).json({ message: 'email requis' });
  const exists = await User.checkEmail(email, excludeId || null);
  res.json({ exists });
};

module.exports = { getUsers, getArchivedUsers, getUserById, createUser, updateUser, deleteUser, archiveUser, restoreUser, checkEmailCtrl, getStats };
