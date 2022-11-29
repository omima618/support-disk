import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, authActions } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import Spinner from '../components/Spinner';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confPassword: '',
    });
    const { name, email, password, confPassword } = formData;

    const onchangeHandler = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confPassword) {
            toast.error("Password don't match");
        } else {
            const user = {
                name,
                email,
                password,
            };
            console.log(user);
            dispatch(register(user));
        }
    };

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/');
        }
        dispatch(authActions.reset());
    }, [isError, isSuccess, user, message, navigate, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Create New Account</p>
            </section>
            <section className="form">
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="from-control"
                            name="name"
                            id="name"
                            value={name}
                            onChange={onchangeHandler}
                            placeholder="Enter your name"
                            autoComplete="on"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="from-control"
                            name="email"
                            id="email"
                            value={email}
                            onChange={onchangeHandler}
                            placeholder="Enter your email"
                            autoComplete="on"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="from-control"
                            name="password"
                            id="password"
                            value={password}
                            onChange={onchangeHandler}
                            placeholder="Enter password"
                            autoComplete="on"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="from-control"
                            name="confPassword"
                            id="confPassword"
                            value={confPassword}
                            onChange={onchangeHandler}
                            placeholder="Confirm password"
                            autoComplete="on"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;
