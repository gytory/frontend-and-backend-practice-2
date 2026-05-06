const express = require('express');
const { port } = require('./config/constants');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const setupSwagger = require('./swagger');

const app = express();

setupSwagger(app);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
  console.error('Ошибка:', err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

const { users } = require('./utils/helpers');
const bcrypt = require('bcryptjs');

const initAdmin = async () => {
  const adminExists = users.find(u => u.role === 'admin');
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('1', 10);
    users.push({
      id: 'admin_' + Date.now(),
      email: 'i.vasilyeva.nd@gmail.com',
      first_name: 'Главный',
      last_name: 'Администратор',
      hashedPassword: hashedPassword,
      role: 'admin',
      isBlocked: false
    });
  }
};
initAdmin();

app.listen(port, () => {
  console.log(`Пряжа Маркет API запущен на http://localhost:${port}`);
  console.log('Васильева Наталья ЭФБО-06-24');
});