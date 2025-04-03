
```markdown
# PinPoint - Profile Management with Interactive Mapping

## Overview
PinPoint is a web-based profile management system that allows users to create, view, and manage profiles with interactive map integration. Admins can add profiles with details such as name, email, contact, interests, and location. The profiles are displayed on a map using the Google Maps API. The system includes role-based authentication, a secure backend API, and an admin panel for managing profiles.

## Technologies Used
- **Frontend:** Next.js, Material UI, Google Maps API  
- **Backend:** Node.js, Express, MongoDB, Mongoose  
- **Security:** Bcrypt.js, JWT, CORS  
- **Admin Panel:** React-Admin, Ant Design / Material UI Dashboard  

## Setup Instructions

### 1. Clone the Repository  
```sh
git clone https://github.com/yourusername/PinPoint.git
cd PinPoint
```

### 2. Backend Setup  
```sh
cd backend
npm install
```
- Create a `.env` file in the `backend` folder and add the following:  
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
- Start the backend server:  
```sh
npm start
```

### 3. Frontend Setup  
```sh
cd ../frontend
npm install
npm run dev
```

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/api/createprofile` | Create a new profile |
| **GET** | `/api/getallprofiles` | Retrieve all profiles |
| **GET** | `/api/getprofile/:profileId` | Get a profile by ID |
| **PUT** | `/api/editprofile/:profileId` | Update a profile |
| **DELETE** | `/api/deleteprofile/:profileId` | Delete a profile |

## Usage
1. Admins log in and create profiles with details like name, email, location, and interests.  
2. Profiles are displayed on an interactive map.  
3. Users can click on a profile to view detailed information.  

## Environment Variables
- **MONGO_URI:** MongoDB connection string  
- **JWT_SECRET:** Secret key for JWT authentication  



---
