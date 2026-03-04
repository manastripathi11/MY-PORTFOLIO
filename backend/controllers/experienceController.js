const Experience = require('../models/Experience');

const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
        res.json({ success: true, count: experiences.length, data: experiences });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

const createExperience = async (req, res) => {
    try {
        const { company, role, duration, description, techStack, current, order } = req.body;
        if (!company || !role || !duration || !description) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }
        const experience = await Experience.create({ company, role, duration, description, techStack, current, order });
        res.status(201).json({ success: true, data: experience });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

const updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!experience) return res.status(404).json({ success: false, error: 'Experience not found' });
        res.json({ success: true, data: experience });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

const deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) return res.status(404).json({ success: false, error: 'Experience not found' });
        res.json({ success: true, message: 'Experience deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

module.exports = { getExperiences, createExperience, updateExperience, deleteExperience };
