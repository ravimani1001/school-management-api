# 🏫 School Management API

A RESTful API built with **Node.js**, **Express.js**, and **MySQL** to manage school data.  
Users can add schools and retrieve a list of schools sorted by proximity to their location.

## 🚀 Features

- Add a school with name, address, latitude, and longitude
- List all schools sorted by distance from a user's location

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL
- Railway (Deployment)
- Postman (API Testing)

## 📦 Endpoints

### ➕ Add School

- **[URL:](https://school-management-api-production-eb05.up.railway.app/)** `/api/addSchool`
- **Method:** `POST`
- **Body:**
```json
{
  "name": "ABC Public School",
  "address": "123 Main Street, City",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

### 📍 List Schools by Proximity

- **[URL:](https://school-management-api-production-eb05.up.railway.app/)** `/api/listSchools`
- Method: GET
- Query Parameters:
  latitude
  longitude

Example:
/listSchools?latitude=12.9716&longitude=77.5946

### 🔐 Environment Variables
- Make a .env file with variables mentioned in the .env.sample file in the repo

### 🚀 Deployment
- Deployed on Railway
- Home route -> **[URL](https://school-management-api-production-eb05.up.railway.app/)**

### 📬 Author
  **Ravi Mani**
