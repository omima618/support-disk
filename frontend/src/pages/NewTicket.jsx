import { useSelector, useDispatch } from 'react-redux';
import { ticketActions, createTicket } from '../features/tickets/ticketSlice';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
const NewTicket = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { name, email } = user;
    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.ticket
    );
    const [ticketData, setTicketData] = useState({
        product: 'iPhone',
        description: '',
    });
    const changeHandler = (e) => {
        setTicketData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createTicket(ticketData));
    };

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            dispatch(ticketActions.reset());
            navigate('/tickets');
        }
        dispatch(ticketActions.reset());
    }, [isLoading, isError, message, dispatch, navigate]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <BackButton url="/" />
            <section className="heading">
                <h1>New Ticket</h1>
                <p>Please fill out the form below</p>
            </section>
            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Customer Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        disabled
                    />
                </div>
                <form onSubmit={submitHandler} style={{ margin: '0 0 30px 0' }}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select
                            value={ticketData.product}
                            name="product"
                            id="product"
                            onChange={changeHandler}
                        >
                            <option value="iPhone">iPhone</option>
                            <option value="Macbook Pro">Macbook Pro</option>
                            <option value="iMac">iMac</option>
                            <option value="iPad">iPad</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            className="form-control"
                            placeholder="Description..."
                            value={ticketData.description}
                            onChange={changeHandler}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default NewTicket;
