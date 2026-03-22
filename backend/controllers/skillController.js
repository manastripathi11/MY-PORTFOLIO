const Skill = require('../models/Skill');

const DEFAULT_SKILLS = [
    {
        category: 'Frontend',
        emoji: '🎨',
        accentColor: '#00ff88',
        order: 0,
        items: [
            { name: 'React' },
            { name: 'JavaScript' },
            { name: 'HTML5' },
            { name: 'CSS3' },
            { name: 'Tailwind CSS' },
            { name: 'Framer Motion' },
            { name: 'Bootstrap' },
        ],
    },
    {
        category: 'Backend',
        emoji: '⚙️',
        accentColor: '#00bcd4',
        order: 1,
        items: [
            { name: 'Node.js' },
            { name: 'Express.js' },
            { name: 'MongoDB' },
            { name: 'MySQL' },
            { name: 'REST APIs' },
            { name: 'JWT Auth' },
            { name: 'Socket.io' },
        ],
    },
    {
        category: 'Tools & DevOps',
        emoji: '🛠️',
        accentColor: '#a855f7',
        order: 2,
        items: [
            { name: 'GitHub' },
            { name: 'Postman' },
            { name: 'VS Code' },
            { name: 'npm' },
            { name: 'Vite' },
            { name: 'Cloudinary' },
            { name: 'Vercel' },
            { name: 'Stripe' },
            { name: 'Resend' },
        ],
    },
];

// GET /api/skills — public
const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ order: 1, createdAt: 1 });
        res.json({ success: true, count: skills.length, data: skills });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// PUT /api/skills — protected; replaces all skill categories
const updateSkills = async (req, res) => {
    try {
        const { skills } = req.body;
        if (!Array.isArray(skills)) {
            return res.status(400).json({ success: false, error: 'skills must be an array' });
        }
        // Delete all existing and insert fresh
        await Skill.deleteMany({});
        const created = await Skill.insertMany(
            skills.map((s, idx) => ({ ...s, order: s.order ?? idx }))
        );
        res.json({ success: true, count: created.length, data: created });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// POST /api/skills/seed — protected; seeds default skills if DB is empty
const seedSkills = async (req, res) => {
    try {
        const existing = await Skill.countDocuments();
        if (existing > 0) {
            return res.json({ success: true, message: 'Skills already seeded', seeded: false });
        }
        await Skill.insertMany(DEFAULT_SKILLS);
        res.json({ success: true, message: 'Default skills seeded successfully', seeded: true });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

module.exports = { getSkills, updateSkills, seedSkills };
