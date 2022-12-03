import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import NoteItem from '../components/NoteItem';
import { useSelector, useDispatch } from 'react-redux';
import {
    ticketActions,
    getTicket,
    closeTicket,
} from '../features/tickets/ticketSlice';
import {
    createNote,
    getNotes,
    notesActions,
} from '../features/notes/noteSlice';
import { FaPlus } from 'react-icons/fa';

// MODAL STYLE
const customStyle = {
    content: {
        position: 'relative',
        width: '400px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const Ticket = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ticketId = params.ticketId;

    // HANDEL MODAL
    const [openModal, setOpenModal] = useState(false);
    const [noteText, setNoteText] = useState('');
    const openModalHandler = () => setOpenModal(true);
    const closeModalHandler = () => setOpenModal(false);

    const { ticket, isLoading, isError, message } = useSelector(
        (state) => state.ticket
    );
    const { notes, isLoading: notesIsLoading } = useSelector(
        (state) => state.notes
    );

    // ADD NOTE
    const AddNoteHandler = (e) => {
        e.preventDefault();
        dispatch(createNote({ noteText, ticketId }));
        closeModalHandler();
    };

    // CLOSE TICKET HANDLER
    const closeTicketHandler = () => {
        dispatch(closeTicket(ticketId));
        toast.success('Ticket Closed Successfully!');
        navigate('/tickets');
    };

    // GET TICKET DATA
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(getTicket(ticketId));
        dispatch(getNotes(ticketId));
    }, [isError, message, ticketId]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h3>Something went wrong!</h3>;
    }

    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton url="/tickets" />
                <h2>
                    Ticket ID : {ticket._id}{' '}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>
                    Date Submited :{' '}
                    {new Date(ticket.createdAt).toLocaleString('en-UK')}
                </h3>
                <h3>Product : {ticket.product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description Of the issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>

            {/* ADD NOTE => SHOW MODAL */}
            {ticket.status !== 'closed' && (
                <button className="btn" onClick={openModalHandler}>
                    <FaPlus /> Add Note
                </button>
            )}
            <Modal
                isOpen={openModal}
                onRequestClose={closeModalHandler}
                style={customStyle}
                contentLabel="Add Note"
            >
                <h2>Add Note</h2>
                <button className="btn-close" onClick={closeModalHandler}>
                    X
                </button>
                <form onSubmit={AddNoteHandler}>
                    <div className="form-group">
                        <textarea
                            name="noteText"
                            id="noteText"
                            className="form-control"
                            placeholder="Note Text"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

            {/* RENDER NOTES */}
            {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
            ))}

            {/* CLOSE TICKET */}
            {ticket.status !== 'closed' && (
                <button
                    onClick={closeTicketHandler}
                    className="btn btn-block btn-danger"
                >
                    Close Ticket
                </button>
            )}
        </div>
    );
};

export default Ticket;
