import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, authActions } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import Spinner from '../components/Spinner';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, message, isLoading, isSuccess, isError } = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;

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
        dispatch(login({ email, password }));
    };
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/');
        }
        dispatch(authActions.reset());
    }, [user, message, isLoading, isSuccess, isError, dispatch, navigate]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login to get support</p>
            </section>
            <section className="form">
                <form onSubmit={submitHandler}>
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
                        <button className="btn btn-block">Login</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;
