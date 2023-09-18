const express = require('express');
const Form = require('../models/form');

const router = express.Router();

router.post('/submit/:projectToken/:userId', async (req, res) => {
    try {
        const {
            first_name,
            middle_name,
            last_name, name,
            email,
            phone_number,
            address,
            address2,
            country,
            city, state,
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

        await submission.save();

        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error submitting form: ', error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const submissionId = req.params.id;

        const submission = await Form.findById(submissionId);

        if (!submission) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        await Form.findByIdAndDelete(submissionId);

        res.status(200).json({ message: 'Submission deleted successfully' });
    } catch (error) {
        console.error('Error deleting submission: ', error);
        res.status(500).json({ error: 'Error deleting submission' });
    }
});

router.get('/:projectToken', async (req, res) => {
    try {
        const { projectToken } = req.params;
        const userId = req.query.userId;

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