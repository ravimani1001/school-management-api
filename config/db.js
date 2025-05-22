const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   connectionLimit: 10, // Use pooling for production-like setup
// });

// module.exports = pool.promise();

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((err) => {
  if (err) {
    console.error(' Error connecting to MySQL:', err);
  } else {
    console.log(' Connected to MySQL');
  }
});

module.exports = connection;
