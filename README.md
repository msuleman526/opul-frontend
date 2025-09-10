# Opul Frontend

Frontend for the Opul ride-sharing platform.

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the frontend directory:
```bash
cd "D:\Sulemans-WorkSpace\Other\Opul\opul-frontend"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api (make sure backend is running)

### Available Routes

- `/` or `/index` - Main page (role selection)
- `/payment` - Payment page
- `/payment-success` - Payment success page
- `/driver-portal` - Driver login/registration
- `/driver-dashboard` - Driver dashboard
- `/drivers` - Available drivers page
- `/chat` - Chat interface

### Tech Stack

- **Server**: Express.js
- **Frontend**: HTML, CSS, JavaScript
- **Port**: 3000

### Backend Connection

The frontend expects the backend API to be running on `http://localhost:5000/api`. Make sure your backend server is running before using the application.

### Development

- Static files are served from the root directory
- All HTML pages can be accessed directly via their routes
- The server handles SPA routing by redirecting unknown routes to the main index.html

### File Structure

```
opul-frontend/
├── index.html          # Main page
├── payment.html        # Payment page
├── payment-success.html # Payment success
├── driver-portal.html  # Driver portal
├── driver-dashboard.html # Driver dashboard
├── drivers.html        # Available drivers
├── Chat.html          # Chat interface
├── server.js          # Express server
├── package.json       # Dependencies
└── README.md          # This file
```
