const express = require('express');
const Form = require('../models/form');

const router = express.Router();

router.post('/submit', async (req, res) => {
    try {
        const { first_name, middle_name, last_name, name, email, phone_number, address, address2, country, city, state, zip, message, } = req.body;

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

router.get('/', async (req, res) => {
    try {
        const submissions = await Form.find();
        res.status(200).json(submissions);
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).json({ error: 'Error fetching submissions' })
    }
})

module.exports = router;