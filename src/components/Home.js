import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ClosedPolls from './ClosedPolls';
import LivePolls from './LivePolls';
import { pollActions } from '../actions/pollActions';

const Home = () => {
    const user = useSelector((state) => state.authentication.user);
    const dispatch = useDispatch();

    const [liveTabActive, setLiveTabActive] = useState(true);

    useEffect(() => {
        dispatch(pollActions.getAllPolls());
    }, []);

    return (
        <>
            <div className="container">
                <div className="tabs is-toggle">
                    <ul>
                        <li
                            className={liveTabActive ? 'is-active' : ''}
                            onClick={() => setLiveTabActive(!liveTabActive)}
                        >
                            <a>
                                <span className="icon">
                                    <i
                                        className="fas fa-chart-line"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                                <span>Live</span>
                            </a>
                        </li>
                        <li
                            className={!liveTabActive ? 'is-active' : ''}
                            onClick={() => setLiveTabActive(!liveTabActive)}
                        >
                            <a>
                                <span className="icon">
                                    <i
                                        className="fas fa-store-slash"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                                <span>Closed</span>
                            </a>
                        </li>
                    </ul>
                </div>
                {liveTabActive && <LivePolls />}
                {!liveTabActive && <ClosedPolls />}
                {/* <section className="section">
                <div className="container">
                    <div className="columns is-multiline">
                        {users.error && (
                <span className="text-danger">ERROR: {users.error}</span>
            )}
                    </div>
                </div>
            </section> */}
            </div>
        </>
    );
};

export default Home;
