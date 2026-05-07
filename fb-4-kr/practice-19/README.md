npm install pg sequelize express

CREATE DATABASE userdb;

node server.js

# Создание пользователя
Invoke-WebRequest -Uri http://localhost:3000/api/users -Method POST -ContentType "application/json" -Body '{"first_name":"Иван","last_name":"Петров","age":25,"email":"ivan@test.ru"}'

# Создание второго пользователя
Invoke-WebRequest -Uri http://localhost:3000/api/users -Method POST -ContentType "application/json" -Body '{"first_name":"Мария","last_name":"Иванова","age":30,"email":"maria@test.ru"}'

# Создание третьего пользователя
Invoke-WebRequest -Uri http://localhost:3000/api/users -Method POST -ContentType "application/json" -Body '{"first_name":"Михаил","last_name":"Алехин","age":20,"email":"mikhail@test.ru"}'

# Получение списка всех пользователей
Invoke-WebRequest -Uri http://localhost:3000/api/users -Method GET

# Получение пользователя с ID = 1
Invoke-WebRequest -Uri http://localhost:3000/api/users/1 -Method GET

# Обновление возраста пользователя с ID = 1
Invoke-WebRequest -Uri http://localhost:3000/api/users/1 -Method PATCH -ContentType "application/json" -Body '{"age":26}'

# Обновление имени и фамилии пользователя с ID = 1
Invoke-WebRequest -Uri http://localhost:3000/api/users/1 -Method PATCH -ContentType "application/json" -Body '{"first_name":"Иван","last_name":"Сидоров"}'

# Удаление пользователя с ID = 1
Invoke-WebRequest -Uri http://localhost:3000/api/users/1 -Method DELETE