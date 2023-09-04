const express = require('express');
const FormSubmission = require('../models/FormSubmissionSchema');

const router = express.Router();

router.post('/submit', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const submission = new FormSubmission({
            name,
            email,
            message,
        });

        await submission.save();

        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error submitting form: ', error })
    }
})

module.exports = router;