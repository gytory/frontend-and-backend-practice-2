const users = [];
const products = [];
const refreshTokens = new Set();

function findUserByEmail(email) {
  return users.find(user => user.email === email);
}

function findUserById(id) {
  return users.find(user => user.id === id);
}

function findProductById(id) {
  return products.find(product => product.id === id);
}

module.exports = {
  users,
  products,
  refreshTokens,
  findUserByEmail,
  findUserById,
  findProductById
};