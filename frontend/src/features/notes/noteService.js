import axois from 'axios';

const API_URL = '/api/tickets/';

// GET NOTES
const getNotes = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axois.get(API_URL + ticketId + '/notes', config);
    return response.data;
};

// ADD NOTE
const createNote = async (noteText, ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axois.post(
        API_URL + ticketId + '/notes',
        { text: noteText },
        config
    );
    return response.data;
};

const noteService = { getNotes, createNote };

export default noteService;
