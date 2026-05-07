const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const app = express();

app.use(express.json());

const sequelize = new Sequelize('userdb', 'postgres', '1', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error:', err));

// Определение модели User
const User = sequelize.define('User', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  created_at: {
    type: DataTypes.BIGINT,
    defaultValue: () => Math.floor(Date.now() / 1000)
  },
  updated_at: {
    type: DataTypes.BIGINT,
    defaultValue: () => Math.floor(Date.now() / 1000)
  }
}, {
  tableName: 'users',
  timestamps: false
});

sequelize.sync();

app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.patch('/api/users/:id', async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      updated_at: Math.floor(Date.now() / 1000)
    };
    const [updatedCount, updatedUsers] = await User.update(updateData, {
      where: { id: req.params.id },
      returning: true
    });
    if (updatedCount === 0) return res.status(404).send('User not found');
    res.send(updatedUsers[0]);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted === 0) return res.status(404).send('User not found');
    res.send({ message: 'User deleted' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});