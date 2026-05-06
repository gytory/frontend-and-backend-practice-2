module.exports = {
  port: 3000,
  ACCESS_SECRET: 'yarn_access_secret',
  REFRESH_SECRET: 'yarn_refresh_secret',
  ACCESS_EXPIRES_IN: '15m',
  REFRESH_EXPIRES_IN: '7d',
  ROLES: {
    USER: 'user',
    SELLER: 'seller',
    ADMIN: 'admin'
  }
};