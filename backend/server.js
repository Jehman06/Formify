const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Added for JWT
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON data in request bodies
app.use(bodyParser.json());

// Enable CORS for all routes or specific origins
app.use(cors());

// Connection to MongoDB database
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB 🚀 ');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB: ', error);
    });

// Import routes for your forms_controller
const formSubmissionRoutes = require('./Routes/forms_controller.js');
app.use('/api', formSubmissionRoutes);

const projectSubmissionRoutes = require('./Routes/projects_controller.js');
app.use('/api/projects', projectSubmissionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 😎`);
});