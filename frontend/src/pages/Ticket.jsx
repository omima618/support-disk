import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    ticketActions,
    getTicket,
    closeTicket,
} from '../features/tickets/ticketSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
const Ticket = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ticketId = params.ticketId;
    const { ticket, isLoading, isError, message } = useSelector(
        (state) => state.ticket
    );

    // CLOSE TICKET HANDLER
    const closeTicketHandler = () => {
        dispatch(closeTicket(ticketId));
        toast.success('Ticket Closed Successfully!');
        navigate('/tickets');
    };

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(getTicket(ticketId));
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
            </header>
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
