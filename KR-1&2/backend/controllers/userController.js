const { ROLES } = require('../config/constants');
const { users, findUserById } = require('../utils/helpers');

exports.getAllUsers = (req, res) => {
  try {
    const usersWithoutPassword = users.map(({ hashedPassword, ...user }) => user);
    res.status(200).json(usersWithoutPassword);
  } catch (err) {
    console.error('Get all users error:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

exports.getUserById = (req, res) => {
  try {
    const user = findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    const { hashedPassword, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    console.error('Get user by id error:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

exports.updateUser = (req, res) => {
  try {
    const user = findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const { first_name, last_name, role, isBlocked } = req.body;

    if (first_name !== undefined) user.first_name = first_name;
    if (last_name !== undefined) user.last_name = last_name;
    if (role !== undefined && Object.values(ROLES).includes(role)) user.role = role;
    if (isBlocked !== undefined) user.isBlocked = isBlocked;

    const { hashedPassword, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

exports.blockUser = (req, res) => {
  try {
    const user = findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    user.isBlocked = true;
    res.status(200).json({ message: 'Пользователь заблокирован' });
  } catch (err) {
    console.error('Block user error:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};