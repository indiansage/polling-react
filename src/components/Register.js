import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { userActions } from '../actions/userActions';

const Register = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector((state) => state.registration.registering);
    const dispatch = useDispatch();
    const history = useHistory();

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
        if (
            user.username &&
            user.password &&
            user.confirmPassword &&
            user.password === user.confirmPassword
        ) {
            dispatch(userActions.register(user, history));
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
                                    <p className="help is-danger">
                                        Username is required
                                    </p>
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
                                <p className="help is-danger">
                                    Password is required
                                </p>
                            )}
                        </div>
                        <div className="field">
                            <label className="label">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="input"
                                value={user.confirmPassword}
                                onChange={handleChange}
                            />
                            {submitted &&
                                user.password !== user.confirmPassword && (
                                    <p className="help is-danger">
                                        Passwords do not match
                                    </p>
                                )}
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button
                                    className={
                                        'button is-link' +
                                        (registering ? ' is-loading' : '')
                                    }
                                >
                                    Register
                                </button>
                            </div>
                            <div className="control">
                                <button
                                    className="button is-link is-light"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        history.push('/login');
                                    }}
                                >
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
