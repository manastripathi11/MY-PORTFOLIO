const Resume = require('../models/Resume');

// GET /api/resume — public
const getResume = async (req, res) => {
    try {
        // Always return the single resume document (create if none exists)
        let resume = await Resume.findOne();
        if (!resume) {
            resume = await Resume.create({ url: '', filename: 'resume.pdf' });
        }
        res.json({ success: true, data: resume });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// PUT /api/resume — protected; updates resume URL
const updateResume = async (req, res) => {
    try {
        const { url, filename } = req.body;
        if (url === undefined) {
            return res.status(400).json({ success: false, error: 'url is required' });
        }
        let resume = await Resume.findOne();
        if (resume) {
            resume.url = url;
            if (filename) resume.filename = filename;
            await resume.save();
        } else {
            resume = await Resume.create({ url, filename: filename || 'resume.pdf' });
        }
        res.json({ success: true, data: resume });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

module.exports = { getResume, updateResume };
