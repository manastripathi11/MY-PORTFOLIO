const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    url: { type: String, default: '' },
    filename: { type: String, default: 'resume.pdf' },
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
