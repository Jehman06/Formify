const express = require('express');
const Form = require('../models/form');

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

        // Create a new form
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

        await submission.save();

        res.status(201).json(submission);
    } catch (error) {
        res.status(500).json({ error: 'Error submitting form: ', error });
    }
});

router.delete('/:formId', async (req, res) => {
    try {
        const { formId } = req.params;

        // Find specific form
        const form = await Form.findById(formId);

        // If form doesn't exist
        if (!form) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        // Delete the form
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

        // Query only the forms that belong to the user, and that belong in the same project
        const forms = await Form.find({ projectToken, userId });
        res.status(200).json(forms);
    } catch (error) {
        console.error('Error fetching form data: ', error);
        res.status(500).json({ error: 'Error fetching forms' });
    }
});

module.exports = router;