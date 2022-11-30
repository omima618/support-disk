const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc get user tickets
// @route GET /api/tickets
// @access private

const getTickets = asyncHandler(async (req, res) => {
    // GET USER BY ID
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found!');
    }
    const tickets = await Ticket.find({ user: req.user.id });
    res.status(200).json(tickets);
});
// @desc get user ticket
// @route GET /api/tickets:/id
// @access private

const getTicket = asyncHandler(async (req, res) => {
    // GET USER BY ID
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found!');
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found!');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorized!');
    }

    res.status(200).json(ticket);
});

// @desc delete ticket
// @route Delete /api/tickets:/id
// @access private

const deleteTicket = asyncHandler(async (req, res) => {
    // GET USER BY ID
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found!');
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found!');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorized!');
    }

    await ticket.remove();
    res.status(200).json({ success: true });
});

// @desc update ticket
// @route UPDATE /api/tickets:/id
// @access private

const updateTicket = asyncHandler(async (req, res) => {
    // GET USER BY ID
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found!');
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found!');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorized!');
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedTicket);
});

// @desc create new ticket
// @route POST /api/tickets
// @access private

const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body;
    if (!product || !description) {
        res.status(400);
        throw new Error('Please enter product and description');
    }

    // GET USER BY ID
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found!');
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new',
    });
    res.status(201).json(ticket);
});

module.exports = {
    getTickets,
    createTicket,
    getTicket,
    deleteTicket,
    updateTicket,
};
