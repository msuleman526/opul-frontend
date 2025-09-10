const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(__dirname));

// Routes for main pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'payment.html'));
});

app.get('/payment-success', (req, res) => {
    res.sendFile(path.join(__dirname, 'payment-success.html'));
});

app.get('/driver-portal', (req, res) => {
    res.sendFile(path.join(__dirname, 'driver-portal.html'));
});

app.get('/driver-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'driver-dashboard.html'));
});

app.get('/drivers', (req, res) => {
    res.sendFile(path.join(__dirname, 'drivers.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'Chat.html'));
});

// Handle SPA routing - catch all other routes and redirect to index
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`🚀 Opul Frontend Server running on http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`🔗 Backend API should be running on: http://localhost:5000/api`);
});
