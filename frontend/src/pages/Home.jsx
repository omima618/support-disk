import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <>
            <section className="heading">
                <h1>What do you need support with?</h1>
                <p>Please choose from options below</p>
            </section>
            <Link to="/new-ticket" className="btn btn-reverse btn-block">
                <FaQuestionCircle /> Create New Ticket
            </Link>
            <Link to="/tickets" className="btn btn-block">
                <FaTicketAlt /> My Tickets
            </Link>
        </>
    );
};

export default Home;
