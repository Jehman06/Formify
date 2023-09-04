const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);

module.exports = FormSubmission;