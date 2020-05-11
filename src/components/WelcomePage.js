import React from 'react';
import jumbotron from '../images/checklist.svg';

const Welcome = () => {
    return (
        <section className="hero is-primary-light is-fullheight-with-navbar is-mobile">
            <img src={jumbotron} alt="vote" />
        </section>
    );
};

export default Welcome;
