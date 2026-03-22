const mongoose = require('mongoose');

const skillItemSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
}, { _id: false });

const skillSchema = new mongoose.Schema({
    category: { type: String, required: true, trim: true },
    emoji: { type: String, default: '🔧' },
    accentColor: { type: String, default: '#00ff88' },
    items: [skillItemSchema],
    order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
