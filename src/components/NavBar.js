import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '../actions/userActions';

const NavBar = () => {
    //const [isActive, setIsActive] = React.useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.authentication.loggedIn);
    const user = useSelector((state) => state.authentication.user);

    return (
        <div data-testid="NavBar">
            <nav className="navbar is-fixed-top is-primary">
                <div className="container">
                    <div className="navbar-brand">
                        <Link to="/">
                            <span className="navbar-item logo is-size-3">
                                polling-react
                            </span>
                        </Link>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-end">
                            {loggedIn ? (
                                <>
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
                                </>
                            ) : (
                                <>
                                    <div className="navbar-item">
                                        <span
                                            className="button is-primary"
                                            onClick={(e) => {
                                                history.push('/login');
                                            }}
                                        >
                                            <strong>Login</strong>
                                        </span>
                                    </div>
                                    <div className="navbar-item">
                                        <span
                                            className="button is-light"
                                            onClick={(e) => {
                                                history.push('/register');
                                            }}
                                        >
                                            Register
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <nav className="navbar is-fixed-bottom is-light bottom-navbar">
                {loggedIn ? (
                    <>
                        <div className="bottom-navbar-item">
                            {user.username}
                        </div>

                        <div className="bottom-navbar-item">
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
                    </>
                ) : (
                    <>
                        <div
                            className="bottom-navbar-item-loggedout"
                            onClick={(e) => {
                                history.push('/login');
                            }}
                        >
                            <span className="icon is-large">
                                <i className="fas fa-3x fa-sign-in-alt" />
                            </span>
                            <div>
                                <strong>Login</strong>
                            </div>
                        </div>
                        <div
                            className="bottom-navbar-item-loggedout"
                            onClick={(e) => {
                                history.push('/register');
                            }}
                        >
                            <span className="icon is-large">
                                <i className="fas fa-3x fa-user-plus" />
                            </span>
                            <div>
                                <strong>Register</strong>
                            </div>
                        </div>
                    </>
                )}
            </nav>
        </div>
    );
};

export default NavBar;
