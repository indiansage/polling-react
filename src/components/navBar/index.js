import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/polly.png';
import './navBar.css';

const NavBar = () => {
    return (
        <div className="hero">
            <div className="hero-body">
                <div className="container">
                    <img src={logo} alt="Polly" className="logo"></img>
                    <span className="navbar-buttons">
                        <Link to="/login">
                            <button className="button is-primary">Login</button>
                        </Link>
                        <Link to="/register">
                            <button className="button">Register</button>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
