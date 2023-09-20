const express = require('express');
const Form = require('../models/form');

// Middleware for handling form submissions
exports.submitForm = async (req, res) => {
    try {
        // Handle form data here
        const formData = req.body;

        // Perform data processing and database operations
        // For example, create a new form submission in the database
        const submission = new Form(formData);
        await submission.save();

        // Respond with a success message
        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
        // Handle errors and respond with an error message
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const router = express.Router();

router.post('/submit/:projectToken/:userId', async (req, res) => {
    try {
        const {
            first_name,
            middle_name,
            last_name,
            name,
            email,
            phone_number,
            address,
            address2,
            country,
            city,
            state,
            zip,
            message,
        } = req.body;

        const { projectToken, userId } = req.params;

        const submission = new Form({
            first_name,
            middle_name,
            last_name,
            name,
            email,
            phone_number,
            address,
            address2,
            country,
            city,
            state,
            zip,
            message,
            projectToken,
            userId
        });

        console.log('req.body: ', req.body);
        console.log('req.params: ', req.params);

        await submission.save();

        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error submitting form: ', error });
    }
});

router.delete('/:formId', async (req, res) => {
    try {
        const { formId } = req.params;

        const form = await Form.findById(formId);

        if (!form) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        await Form.findByIdAndDelete(formId);

        res.status(200).json({ message: 'Submission deleted successfully' });
    } catch (error) {
        console.error('Error deleting submission: ', error);
        res.status(500).json({ error: 'Error deleting submission' });
    }
});

router.get('/:projectToken', async (req, res) => {
    try {
        const { projectToken } = req.params;
        const userId = req.query.userId; // Access query parameter using req.query

        if (!userId || !projectToken) {
            return res.status(401).json({ error: 'Invalid request' });
        }

        const forms = await Form.find({ projectToken, userId });
        res.status(200).json(forms);
    } catch (error) {
        console.error('Error fetching form data: ', error);
        res.status(500).json({ error: 'Error fetching forms' });
    }
});

module.exports = router;