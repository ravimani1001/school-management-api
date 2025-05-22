const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController.js');

// Route: POST /api/addSchool
router.post('/addSchool', schoolController.addSchool);

// Route: GET /api/listSchools
router.get('/listSchools', schoolController.listSchools);


module.exports = router;
