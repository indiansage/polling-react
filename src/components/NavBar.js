import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '../actions/userActions';

const NavBar = () => {
    const [isActive, setIsActive] = React.useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.authentication.loggedIn);
    const user = useSelector((state) => state.authentication.user);
    if (loggedIn) {
        return (
            <nav className="navbar is-fixed-top is-light">
                <div className="container">
                    <div className="navbar-brand">
                        <Link to="/">
                            <span className="navbar-item logo is-size-3">
                                polling-react
                            </span>
                        </Link>
                        <div
                            role="button"
                            className={`navbar-burger burger ${
                                isActive ? 'is-active' : ''
                            }`}
                            data-target="navMenu"
                            onClick={() => {
                                setIsActive(!isActive);
                            }}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div
                        className={`navbar-menu ${isActive ? 'is-active' : ''}`}
                        id="navMenu"
                    >
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <strong>{user.username}</strong>
                            </div>

                            <div className="navbar-item">
                                <span
                                    className="button is-light"
                                    onClick={(e) => {
                                        dispatch(userActions.logout());
                                        history.push('/login');
                                    }}
                                >
                                    Logout
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="navbar is-fixed-top is-light">
                <div className="container">
                    <div className="navbar-brand">
                        <Link to="/">
                            <span className="navbar-item logo is-size-3">
                                polling-react
                            </span>
                        </Link>
                        <div
                            role="button"
                            className={`navbar-burger burger ${
                                isActive ? 'is-active' : ''
                            }`}
                            data-target="navMenu"
                            onClick={() => {
                                setIsActive(!isActive);
                            }}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div
                        className={`navbar-menu ${isActive ? 'is-active' : ''}`}
                        id="navMenu"
                    >
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <span
                                        className="button is-primary"
                                        onClick={(e) => {
                                            history.push('/login');
                                        }}
                                    >
                                        <strong>Login</strong>
                                    </span>

                                    <span
                                        className="button is-light"
                                        onClick={(e) => {
                                            history.push('/register');
                                        }}
                                    >
                                        Register
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
};

export default NavBar;
