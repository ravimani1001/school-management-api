const db = require('./config/db');

async function testDB() {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('DB Connected! Test result:', rows[0].result);
  } catch (error) {
    console.error('DB connection failed:', error);
  }
}

testDB();
