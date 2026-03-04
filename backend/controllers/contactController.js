const { Resend } = require('resend');
const Message = require('../models/Message');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendContact = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, error: 'Invalid email address' });
    }

    if (message.length < 10) {
        return res.status(400).json({ success: false, error: 'Message must be at least 10 characters' });
    }

    try {
        const newMessage = await Message.create({ name, email, message });

        await resend.emails.send({
            from: 'Portfolio Contact Form <onboarding@resend.dev>',
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Portfolio Contact Message from ${name}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e6edf3; padding: 30px; border-radius: 10px; border: 1px solid #30363d;">
          <h2 style="color: #00ff88; border-bottom: 1px solid #30363d; padding-bottom: 15px;">New Contact Message</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; color: #8b949e; width: 100px;"><strong>Name:</strong></td>
              <td style="padding: 12px 0; color: #e6edf3;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #8b949e;"><strong>Email:</strong></td>
              <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #00ff88;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #8b949e; vertical-align: top;"><strong>Message:</strong></td>
              <td style="padding: 12px 0; color: #e6edf3;">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; color: #8b949e; font-size: 12px;">Sent from your portfolio website • ${new Date().toLocaleString()}</p>
        </div>
      `
        });

        res.status(201).json({
            success: true,
            message: 'Message sent successfully! I will get back to you soon.',
            data: newMessage,
        });
    } catch (error) {
        console.error('Contact Error:', error);
        res.status(500).json({ success: false, error: 'Failed to send message. Please try again.' });
    }
};

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json({ success: true, count: messages.length, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

const markAsRead = async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        if (!message) return res.status(404).json({ success: false, error: 'Message not found' });
        res.json({ success: true, data: message });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) return res.status(404).json({ success: false, error: 'Message not found' });
        res.json({ success: true, message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

module.exports = { sendContact, getMessages, markAsRead, deleteMessage };
