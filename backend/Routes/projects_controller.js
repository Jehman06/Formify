const express = require('express');
const Project = require('../models/project');

const router = express.Router();

router.post('/new', async (req, res) => {
    try {
        const { name } = req.body;
        const project = new Project({
            name,
        });

        await project.save();

        res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating project: ', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).json({ error: 'Error fetching submissions' })
    }
});

module.exports = router;