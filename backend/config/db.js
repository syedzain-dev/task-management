// import mysql from 'mysql2';
// import dotenv from 'dotenv';

// dotenv.config();

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('✅ MySQL connected');
// });

// export default db;

// db.js
import mysql from 'mysql2/promise'; // this uses the promise API directly
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export default db;
