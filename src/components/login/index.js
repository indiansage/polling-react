import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../actions/userActions';

const Login = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const dispatch = useDispatch();
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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                    {submitted && !username && (
                        <div className="invalid-feedback">
                            Username is required
                        </div>
                    )}
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                    {submitted && !password && <div>Password is required</div>}
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
