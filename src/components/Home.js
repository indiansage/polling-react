import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ClosedPolls from './ClosedPolls';
import LivePolls from './LivePolls';
import { UserList } from './UserList';
import { pollActions } from '../actions/pollActions';

const Home = () => {
    const user = useSelector((state) => state.authentication.user);
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState([true, false, false]);

    useEffect(() => {
        dispatch(pollActions.getAllPolls());
    }, [dispatch]);

    if (user.isAdmin) {
        return (
            <div className="container is-fluid" data-testid="AdminHome">
                <div className="tabs is-toggle">
                    <ul>
                        <li
                            data-testid="LiveTab"
                            className={activeTab[0] ? 'is-active' : ''}
                            onClick={() => setActiveTab([true, false, false])}
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
                            data-testid="ClosedTab"
                            className={activeTab[1] ? 'is-active' : ''}
                            onClick={() => setActiveTab([false, true, false])}
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
                        <li
                            data-testid="ListOfUsersTab"
                            className={activeTab[2] ? 'is-active' : ''}
                            onClick={() => setActiveTab([false, false, true])}
                        >
                            <a>
                                <span className="icon">
                                    <i
                                        className="fas fa-users"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                                <span>List of Users</span>
                            </a>
                        </li>
                    </ul>
                </div>
                {activeTab[0] && <LivePolls />}
                {activeTab[1] && <ClosedPolls />}
                {activeTab[2] && <UserList />}
            </div>
        );
    } else {
        return (
            <div className="container" data-testid="UserHome">
                <LivePolls />
            </div>
        );
    }
};

export default Home;
