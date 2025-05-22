const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const schoolRoutes = require('./routes/schoolRoutes.js');

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(cors());

// Routes
app.use('/api', schoolRoutes);

// Root route or home route
app.get('/', (req, res) => {
  res.send('School Management API is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
