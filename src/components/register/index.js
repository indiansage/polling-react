import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../actions/userActions';

const Register = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    //const registering = useSelector((state) => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser((user) => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                    />
                    {submitted && !user.firstName && (
                        <div>First Name is required</div>
                    )}
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                    />
                    {submitted && !user.lastName && (
                        <div>Last Name is required</div>
                    )}
                </div>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                    />
                    {submitted && !user.username && (
                        <div>Username is required</div>
                    )}
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    {submitted && !user.password && (
                        <div>Password is required</div>
                    )}
                </div>
                <div>
                    <button>Register</button>
                    <Link to="/">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
