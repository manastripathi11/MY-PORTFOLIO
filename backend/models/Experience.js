const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true,
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            trim: true,
        },
        duration: {
            type: String,
            required: [true, 'Duration is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
        },
        techStack: {
            type: [String],
            default: [],
        },
        current: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Experience', experienceSchema);
