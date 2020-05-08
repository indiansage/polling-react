import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../actions/userActions';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const dispatch = useDispatch();
    const history = useHistory();

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            dispatch(userActions.login(username, password));
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
                                    <div className="invalid-feedback">
                                        Username is required
                                    </div>
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
                                    <div>Password is required</div>
                                )}
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">
                                    Login
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

export default Login;
