const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Ticket = require('../models/ticketModel');

// @desc get notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access private

const getNotes = asyncHandler(async (req, res) => {
    // GET USER BY ID
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found!');
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User Not Authorized!');
    }

    const notes = await Note.find({ ticket: req.params.ticketId });

    res.status(200).json(notes);
});

// @desc Create note for a ticket
// @route POST /api/tickets/:ticketId/notes
// @access private

const addNote = asyncHandler(async (req, res) => {
    // GET USER BY ID
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found!');
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User Not Authorized!');
    }

    const note = await Note.create({
        text: req.body.text,
        ticket: req.params.ticketId,
        isStaff: false,
        user: req.user.id,
    });

    res.status(200).json(note);
});

const noteController = { getNotes, addNote };

module.exports = noteController;
