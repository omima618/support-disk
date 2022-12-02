import axois from 'axios';

const API_URL = '/api/tickets/';

// CREATE TICKET
const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axois.post(API_URL, ticketData, config);
    return response.data;
};

// GET TICKETS
const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axois.get(API_URL, config);
    return response.data;
};

// GET TICKET
const getTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axois.get(API_URL + ticketId, config);
    return response.data;
};

// GET TICKET
const closeTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axois.put(
        API_URL + ticketId,
        { status: 'closed' },
        config
    );
    return response.data;
};

const ticketService = {
    createTicket,
    getTickets,
    getTicket,
    closeTicket,
};
export default ticketService;
