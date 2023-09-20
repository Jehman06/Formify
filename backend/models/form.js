const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    first_name: String,
    middle_name: String,
    last_name: String,
    name: String,
    email: String,
    phone_number: String,
    address: String,
    address2: String,
    country: String,
    city: String,
    state: String,
    zip: Number,
    message: String,
    date: {
        type: Date,
        default: Date.now,
    },
    projectToken: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;