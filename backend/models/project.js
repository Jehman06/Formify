const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;