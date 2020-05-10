import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ClosedPolls from './ClosedPolls';
import LivePolls from './LivePolls';
import { pollActions } from '../actions/pollActions';

const Home = () => {
    const user = useSelector((state) => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pollActions.getAllPolls());
    }, []);

    return (
        <>
            <LivePolls />
            {user.isAdmin && <ClosedPolls />}
            {/* <section className="section">
                <div className="container">
                    <div className="columns is-multiline">
                        {users.error && (
                <span className="text-danger">ERROR: {users.error}</span>
            )}
                    </div>
                </div>
            </section> */}
        </>
    );
};

export default Home;
