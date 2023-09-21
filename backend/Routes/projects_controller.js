const express = require('express');
const Project = require('../models/project');

const router = express.Router();

router.post('/new', async (req, res) => {
    try {
        const { name, userId } = req.body; // Get the user ID from the request body
        const token = generateUniqueToken(); // See function declaration below

        // Create a new project
        const project = new Project({
            name,
            userId,
            token,
        });

        // Save project
        await project.save();

        res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating project: ' + error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId; // Get the user ID from the request query

        // If user is unauthenticated somehow
        if (!userId) {
            return res.status(401).json({ error: 'Please authenticate' });
        }

        // We find all the projects that belong to the user
        const projects = await Project.find({ userId });
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).json({ error: 'Error fetching submissions' });
    }
});

const generateUniqueToken = () => {
    // Generate a random token using a combination of characters
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tokenLength = 12;
    let token = '';

    for (let i = 0; i < tokenLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
        console.log(token)
    }

    return token;
}

module.exports = router;