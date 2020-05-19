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
    const [usernameRegexCheck, setUsernameRegexCheck] = useState(true);
    const [passwordRegexCheck, setPasswordRegexCheck] = useState(true);

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser((user) => ({ ...user, [name]: value }));
        setSubmitted(false);
    }

    const regexCheck = (exp, type) => {
        if (type === 'USERNAME_REGEX') {
            return exp.match(/^[a-zA-Z0-9]{4,}$/) ? true : false;
        } else if (type === 'PASSWORD_REGEX') {
            return exp.match(
                /^(?=.*[0-9])(?=.*[- ?!@#$%^&*/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*/\\]{8,30}$/
            )
                ? true
                : false;
        }
    };

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        const validUsername = regexCheck(user.username, 'USERNAME_REGEX');
        const validPassword = regexCheck(user.password, 'PASSWORD_REGEX');

        setUsernameRegexCheck(validUsername);
        setPasswordRegexCheck(validPassword);
        if (
            user.username &&
            user.password &&
            user.confirmPassword &&
            validPassword &&
            user.password === user.confirmPassword
        ) {
            dispatch(userActions.register(user, history));
        }
    }

    return (
        <div className="container is-fluid">
            <div className="columns">
                <div className="column is-offset-3 is-6">
                    <div className="box login-box">
                        <h2 className="is-size-3">Register</h2>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label className="label">
                                    Username
                                    <div className="control has-icons-left">
                                        <input
                                            type="text"
                                            name="username"
                                            className="input"
                                            value={user.username}
                                            onChange={handleChange}
                                            placeholder="Enter a unique username"
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-user"></i>
                                        </span>
                                        {submitted && !user.username && (
                                            <p className="help is-danger">
                                                Username is required
                                            </p>
                                        )}
                                        {submitted &&
                                            user.username &&
                                            !usernameRegexCheck &&
                                            (user.username.length < 4 ? (
                                                <p className="help is-danger">
                                                    Username must contain at
                                                    least 4 characters
                                                </p>
                                            ) : (
                                                <p className="help is-danger">
                                                    Username can contain
                                                    uppercase, lowercase
                                                    alphabets and digits only
                                                </p>
                                            ))}
                                    </div>
                                </label>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Password
                                    <div className="control has-icons-left">
                                        <input
                                            type="password"
                                            name="password"
                                            className="input"
                                            value={user.password}
                                            onChange={handleChange}
                                            placeholder="Enter a unique password"
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        {submitted && !user.password && (
                                            <p className="help is-danger">
                                                Password is required
                                            </p>
                                        )}
                                        {submitted &&
                                            user.password &&
                                            !passwordRegexCheck &&
                                            (user.password.length < 8 ||
                                            user.password.length > 30 ? (
                                                <p className="help is-danger">
                                                    Password must contain
                                                    between 8-30 characters
                                                </p>
                                            ) : (
                                                <p className="help is-danger">
                                                    Password must contain at
                                                    least an uppercase and a
                                                    lowercase alphabet, a digit
                                                    and a special symbol
                                                </p>
                                            ))}
                                    </div>
                                </label>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Confirm Password
                                    <div className="control has-icons-left">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            className="input"
                                            value={user.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Repeat the password"
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        {submitted &&
                                            user.password !==
                                                user.confirmPassword && (
                                                <p className="help is-danger">
                                                    Passwords do not match
                                                </p>
                                            )}
                                    </div>
                                </label>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <button
                                        className={
                                            'button is-link' +
                                            (registering ? ' is-loading' : '')
                                        }
                                        data-testid="ConfirmRegister"
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
                                        data-testid="CancelRegister"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
