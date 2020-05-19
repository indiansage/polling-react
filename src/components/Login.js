import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { userActions } from '../actions/userActions';

const Login = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;

    const loggingIn = useSelector((state) => state.authentication.loggingIn);

    const dispatch = useDispatch();
    const history = useHistory();
    //console.log(history);
    //console.log(useHistory);

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            dispatch(userActions.login(username, password, history));
        }
    }
    return (
        <div className="container is-fluid" data-testid="Login">
            <div className="columns">
                <div className="column is-offset-4 is-4">
                    <div className="box login-box">
                        <h2 className="is-size-3">Login</h2>

                        <div className="fade-rule" />
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label className="label">Username</label>
                                <div className="control has-icons-left">
                                    <input
                                        type="text"
                                        name="username"
                                        value={username}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="Enter username"
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                    {submitted && !username && (
                                        <p className="help is-danger">
                                            Username is required
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control has-icons-left">
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="Enter password"
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                    {submitted && !password && (
                                        <p className="help is-danger">
                                            Password is required
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <button
                                        className={
                                            'button is-link' +
                                            (loggingIn ? ' is-loading' : '')
                                        }
                                    >
                                        Login
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
        </div>
    );
};

export default Login;
