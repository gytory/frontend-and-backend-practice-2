const { nanoid } = require('nanoid');
const { products } = require('../utils/helpers');

exports.createProduct = (req, res) => {
  const { title, category, description, price } = req.body;

  if (!title || !category || !description || price === undefined) {
    return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
  }

  const newProduct = {
    id: nanoid(),
    title,
    category,
    description,
    price: Number(price),
    createdAt: new Date().toISOString(),
    createdBy: req.user.sub
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.getAllProducts = (req, res) => {
  res.status(200).json(products);
};

exports.getProductById = (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }
  res.status(200).json(product);
};

exports.updateProduct = (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  const { title, category, description, price } = req.body;
  if (title !== undefined) product.title = title;
  if (category !== undefined) product.category = category;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = Number(price);

  res.status(200).json(product);
};

exports.deleteProduct = (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  products.splice(index, 1);
  res.status(200).json({ message: 'Товар удалён' });
};