import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ticketActions, getTickets } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';
const Tickets = () => {
    const dispatch = useDispatch();
    const { tickets, isSuccess, isLoading } = useSelector(
        (state) => state.ticket
    );
    // useEffect(() => {
    //     return () => {
    //         if (isSuccess) {
    //             dispatch(ticketActions.reset());
    //         }
    //         console.log(tickets);
    //     };
    // }, [dispatch, isSuccess]);
    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch]);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <BackButton url="/" />
            <h1>Tickets</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>
                {tickets.map((ticket) => {
                    return <TicketItem key={ticket._id} ticket={ticket} />;
                })}
            </div>
        </>
    );
};

export default Tickets;
