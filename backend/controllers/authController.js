const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');
const { ROLES } = require('../config/constants');
const { generateAccessToken, generateRefreshToken } = require('../services/tokenService');
const { users, refreshTokens, findUserByEmail, findUserById } = require('../utils/helpers');

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

exports.register = async (req, res) => {
  const { email, first_name, last_name, password, role } = req.body;

  if (!email || !first_name || !last_name || !password) {
    return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
  }

  if (findUserByEmail(email)) {
    return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
  }

  let userRole = ROLES.USER;
  if (role && Object.values(ROLES).includes(role)) {
    userRole = role;
  }

  const hashedPassword = await hashPassword(password);
  const newUser = {
    id: nanoid(),
    email,
    first_name,
    last_name,
    hashedPassword,
    role: userRole,
    isBlocked: false
  };

  users.push(newUser);
  const { hashedPassword: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email и пароль обязательны' });
  }

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Неверный email или пароль' });
  }

  if (user.isBlocked) {
    return res.status(403).json({ error: 'Аккаунт заблокирован' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Неверный email или пароль' });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  refreshTokens.add(refreshToken);

  res.status(200).json({
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role
    }
  });
};

exports.refresh = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Отсутствует refresh токен' });
  }

  if (!refreshTokens.has(refreshToken)) {
    return res.status(401).json({ error: 'Недействительный refresh токен' });
  }

  try {
    const jwt = require('jsonwebtoken');
    const { REFRESH_SECRET } = require('../config/constants');
    const payload = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = findUserById(payload.sub);
    
    if (!user || user.isBlocked) {
      return res.status(401).json({ error: 'Пользователь не найден или заблокирован' });
    }

    refreshTokens.delete(refreshToken);
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    refreshTokens.add(newRefreshToken);

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return res.status(401).json({ error: 'Недействительный или просроченный refresh токен' });
  }
};

exports.me = (req, res) => {
  const user = findUserById(req.user.sub);
  if (!user) {
    return res.status(404).json({ error: 'Пользователь не найден' });
  }
  res.status(200).json({
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
    isBlocked: user.isBlocked
  });
};
