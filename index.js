// Basic Express server setup
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Better logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Language endpoint
app.get('/api/language/:lang', async (req, res) => {
    try {
        const lang = req.params.lang;
        const filePath = path.join(__dirname, 'languages', `${lang}.json`);
        const data = await fs.readFile(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error loading language file:', error);
        res.status(404).json({ error: 'Language not found' });
    }
});

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Partners endpoint
app.get('/partners', (req, res) => {
    // Mock data for partners
    const partners = [
        {
            name: "Green Valley Farms",
            description: "Organic produce grown with sustainable practices"
        },
        {
            name: "Sunny Side Orchards",
            description: "Fresh fruits and vegetables from local orchards"
        },
        {
            name: "Mountain View Dairy",
            description: "Premium dairy products from grass-fed cows"
        },
        {
            name: "Fresh Harvest Co-op",
            description: "Community-supported agriculture and fresh produce"
        }
    ];
    
    res.json(partners);
});

const testimonials = [
    { id: 1, name: "Jane Doe", text: "The quality of the produce is outstanding! I love knowing that I'm supporting local farmers.", location: "New York, NY" },
    { id: 2, name: "John Smith", text: "Fast delivery and fresh products every time. Highly recommend!", location: "Los Angeles, CA" },
    { id: 3, name: "Emily Johnson", text: "Agera has made it so easy to get fresh, organic produce delivered to my door. Love it!", location: "Chicago, IL" }
];

// GET /testimonials
app.get('/testimonials', (req, res) => {
    res.json(testimonials);
});

// Placeholder image endpoint
app.get('/api/placeholder/:width/:height', (req, res) => {
    const { width, height } = req.params;
    res.redirect(`https://picsum.photos/${width}/${height}`);
});

// Serve static files
app.use(express.static(path.join(__dirname, '..')));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`
    🚀 Server is running!
    📡 Port: ${PORT}
    🌐 URL: http://localhost:${PORT}
    
    Available endpoints:
    - GET /partners
    - GET /testimonials
    
    Press Ctrl+C to stop the server
    `);
});
