const express = require('express');
const Project = require('../models/project');
const Form = require('../models/form');

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

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Error creating project: ' + error.message });
    }
});

router.delete('/:token', async (req, res) => {
    try {
        const { token } = req.params;

        // Find the project by its token and delete it
        const deletedProject = await Project.findOneAndRemove({ token });

        if (!deletedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Delete associated forms
        await Form.deleteMany({ projectToken: token });

        res.status(200).json(deletedProject);
    } catch (error) {
        console.error('Error deleting the project: ', error);
        res.status(500).json({ error: 'Error deleting the project' })
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