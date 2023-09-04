const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON data in request bodies
app.use(bodyParser.json());

// Connection to MongoDB database
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB 🤙');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB: ', error);
    })

const formSubmissionRoutes = require('./Routes/Form.js');
app.use('/api', formSubmissionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 😎`)
})