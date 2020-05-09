import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../actions/userActions';
import { useHistory } from 'react-router-dom';

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

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

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
        <div className="columns">
            <div className="column is-offset-4 is-4">
                <div className="box">
                    <h2 className="is-size-3">Login</h2>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control">
                                <input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={handleChange}
                                    className="input"
                                />
                                {submitted && !username && (
                                    <p className="help is-danger">
                                        Username is required
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    className="input"
                                />
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
                                        history.push('/welcome');
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

export default Login;
