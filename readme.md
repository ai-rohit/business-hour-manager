## Business Hour Manager Backend

### Use `npm` for installaion

### Used stack -> Node.js (express.js), Mysql, sequelize, sequelize-cli, express-validator for validation

### Steps:

1. Open cmd line in project directory and run `npm install`
2. Create `.env` file in base directory
3. Need to run mysql and apache (using xampp maybe)
4. In project directory, run `npx sequelize-cli db:create` in cmd to create database
5. Run `npx sequelize-cli db:migrate` to run migrations
6. Now run `npm start` to run the project

- `.env` file
  ```
  PORT=4000
  JWT_SECRET="your-secret-key"
  ```
