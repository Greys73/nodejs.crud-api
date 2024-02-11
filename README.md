### Simple CRUD API using in-memory database

## Prepare
Clone repo
```
git clone https://github.com/Greys73/nodejs.crud-api.git
```
Change folder
```
cd nodejs.crud-api
```
Install modules
```bash
npm install
```
Create .env file in root folder with some port number
```
PORT=3000
```
Start server
```bash
npm run start:dev # Development mode
npm run start:prod # Production mode
```
## Usage
Get all users
```
method: GET
address: http://localhost:5001/api/users
```
Get user by ID
```
method: GET
address: http://localhost:5001/api/users/${userID}
```
Add new user
```
method: POST
address: http://localhost:5001/api/users
body: {
    "username": "User",
    "age": 25,
    "hobbies": ["hobbie1", "hobbie2", "hobbie3"]
}
```
Update user
```
method: PUT
address: http://localhost:5001/api/users/${userID}
body: {
    "username": "Updated",
    "age": 26,
    "hobbies": ["hobbie4", "hobbie5"]
}
```
Delete user
```
method: DELETE
address: http://localhost:5001/api/users/${userID}
```