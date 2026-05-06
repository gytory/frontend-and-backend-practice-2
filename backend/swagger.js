const swaggerUi = require('swagger-ui-express');

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Пряжа Маркет API',
    version: '1.0.0',
    description: 'API для магазина пряжи с системой ролей',
    contact: {
      name: 'Васильева Наталья ЭФБО-06-24'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Локальный сервер'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string' },
          first_name: { type: 'string' },
          last_name: { type: 'string' },
          role: { type: 'string', enum: ['user', 'seller', 'admin'] },
          isBlocked: { type: 'boolean' }
        }
      },
      Product: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          category: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number' }
        }
      }
    }
  },
  paths: {
    '/auth/register': {
      post: {
        summary: 'Регистрация',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'first_name', 'last_name', 'password'],
                properties: {
                  email: { type: 'string', example: 'user@test.com' },
                  first_name: { type: 'string', example: 'Иван' },
                  last_name: { type: 'string', example: 'Петров' },
                  password: { type: 'string', example: '123456' },
                  role: { type: 'string', enum: ['user', 'seller', 'admin'] }
                }
              }
            }
          }
        },
        responses: { 201: { description: 'Пользователь создан' }, 400: { description: 'Ошибка' } }
      }
    },
    '/auth/login': {
      post: {
        summary: 'Вход',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'user@test.com' },
                  password: { type: 'string', example: '123456' }
                }
              }
            }
          }
        },
        responses: { 200: { description: 'Успешный вход' }, 401: { description: 'Ошибка' } }
      }
    },
    '/auth/me': {
      get: {
        summary: 'Информация о себе',
        tags: ['Auth'],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: 'Данные пользователя' } }
      }
    },
    '/users': {
      get: {
        summary: 'Список пользователей (только admin)',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: 'Список пользователей' } }
      }
    },
    '/products': {
      get: {
        summary: 'Список товаров',
        tags: ['Products'],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: 'Список товаров' } }
      },
      post: {
        summary: 'Создать товар (seller/admin)',
        tags: ['Products'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'category', 'description', 'price'],
                properties: {
                  title: { type: 'string' },
                  category: { type: 'string' },
                  description: { type: 'string' },
                  price: { type: 'number' }
                }
              }
            }
          }
        },
        responses: { 201: { description: 'Товар создан' } }
      }
    },
    '/products/{id}': {
      get: {
        summary: 'Товар по ID',
        tags: ['Products'],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Данные товара' } }
      },
      put: {
        summary: 'Обновить товар (seller/admin)',
        tags: ['Products'],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  category: { type: 'string' },
                  description: { type: 'string' },
                  price: { type: 'number' }
                }
              }
            }
          }
        },
        responses: { 200: { description: 'Товар обновлён' } }
      },
      delete: {
        summary: 'Удалить товар (только admin)',
        tags: ['Products'],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Товар удалён' } }
      }
    }
  }
};

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger UI: http://localhost:3000/api-docs');
}

module.exports = setupSwagger;