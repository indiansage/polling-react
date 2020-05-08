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
        <div className="columns">
            <div className="column is-offset-4 is-4">
                <div className="box">
                    <h2 className="is-size-3">Register</h2>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">First Name</label>
                            <div className="control">
                                <input
                                    type="text"
                                    name="firstName"
                                    className="input"
                                    value={user.firstName}
                                    onChange={handleChange}
                                />
                                {submitted && !user.firstName && (
                                    <div>First Name is required</div>
                                )}
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Last Name</label>
                            <div className="control">
                                <input
                                    type="text"
                                    name="lastName"
                                    className="input"
                                    value={user.lastName}
                                    onChange={handleChange}
                                />
                                {submitted && !user.lastName && (
                                    <div>Last Name is required</div>
                                )}
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control">
                                <input
                                    type="text"
                                    name="username"
                                    className="input"
                                    value={user.username}
                                    onChange={handleChange}
                                />
                                {submitted && !user.username && (
                                    <div>Username is required</div>
                                )}
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="input"
                                value={user.password}
                                onChange={handleChange}
                            />
                            {submitted && !user.password && (
                                <div>Password is required</div>
                            )}
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">
                                    Register
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-link is-light">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
