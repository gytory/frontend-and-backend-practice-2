npm install mongoose express

node server.js

use admin
db.createUser({
  user: "ivasi",
  pwd: "1234",
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    "readWriteAnyDatabase"
  ]
})
exit

curl.exe -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d "{\"first_name\":\"Иван\",\"last_name\":\"Петров\",\"age\":25,\"email\":\"ivan@test.ru\"}"

curl.exe -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d "{\"first_name\":\"Мария\",\"last_name\":\"Иванова\",\"age\":30,\"email\":\"maria@test.ru\"}"

curl.exe -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d "{\"first_name\":\"Михаил\",\"last_name\":\"Алехин\",\"age\":20,\"email\":\"mikhail@test.ru\"}"

curl.exe http://localhost:3000/api/users

curl.exe http://localhost:3000/api/users/{id}

curl.exe -X PATCH http://localhost:3000/api/users/{id} -H "Content-Type: application/json" -d "{\"age\":26}"

curl.exe -X DELETE http://localhost:3000/api/users/{id}