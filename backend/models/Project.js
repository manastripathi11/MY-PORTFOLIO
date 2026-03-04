const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Project title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
        },
        image: {
            type: String,
            default: '',
        },
        techStack: {
            type: [String],
            default: [],
        },
        liveUrl: {
            type: String,
            default: '',
        },
        githubUrl: {
            type: String,
            default: '',
        },
        featured: {
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

module.exports = mongoose.model('Project', projectSchema);
