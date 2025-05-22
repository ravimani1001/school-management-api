const db = require('../config/db.js');

// POST /api/addSchool
exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Basic validation
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Type checks
  if (typeof name !== 'string' || typeof address !== 'string') {
    return res.status(400).json({ error: 'Name and address must be strings.' });
  }

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Latitude and longitude must be valid numbers.' });
  }

  try {
    const query = `
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES (?, ?, ?, ?)
    `;

    await db.execute(query, [name, address, latitude, longitude]);

    res.status(201).json({ message: 'School added successfully.' });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};


const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRad = angle => (angle * Math.PI) / 180;
//   const R = 6371; // Earth radius in km

//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) *
//     Math.cos(toRad(lat2)) *
//     Math.sin(dLon / 2) ** 2;

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in km

    let dLat = (lat2 - lat1) * Math.PI / 180.0;
    let dLon = (lon2 - lon1) * Math.PI / 180.0;
          
    lat1 = (lat1) * Math.PI / 180.0;
    lat2 = (lat2) * Math.PI / 180.0;
        
    // apply formulae
    let a = Math.pow(Math.sin(dLat / 2), 2) + 
                Math.pow(Math.sin(dLon / 2), 2) * 
                Math.cos(lat1) * 
                Math.cos(lat2);
    let rad = 6371;
    let c = 2 * Math.asin(Math.sqrt(a));
    return rad * c;
};

exports.listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  // Input validation
  if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Valid latitude and longitude are required.' });
  }

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  try {
    const [schools] = await db.execute('SELECT * FROM schools');

    const schoolsWithDistance = schools.map(school => {
      const distance = haversineDistance(userLat, userLon, school.latitude, school.longitude);
      return { ...school, distance: +distance.toFixed(2) };
    });

    // Sort schools by distance ascending
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json(schoolsWithDistance);
  } catch (error) {
    console.error('Error listing schools:', error);
    res.status(500).json({ error: 'Unable to fetch schools. Please try again later.' });
  }
};
