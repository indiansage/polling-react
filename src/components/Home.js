import React, { useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { pollActions } from '../actions/pollActions';

const Home = () => {
    const polls = useSelector((state) => state.polls);
    const user = useSelector((state) => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pollActions.getAllPolls());
    }, []);

    return (
        <div>
            <h1>Hi {user.firstName}!</h1>
            <p>You're logged in!!</p>
            <h3>All polls:</h3>
            {polls.loading && <em>Loading polls...</em>}
            {/* {users.error && (
                <span className="text-danger">ERROR: {users.error}</span>
            )} */}
            {polls.items && (
                <ul>
                    {polls.items.map((poll, index) => (
                        <li key={poll.id}>
                            {poll.question}
                            {/* {user.firstName + ' ' + user.lastName}
                            {user.deleting ? (
                                <em> - Deleting...</em>
                            ) : user.deleteError ? (
                                <span className="text-danger">
                                    {' '}
                                    - ERROR: {user.deleteError}
                                </span>
                            ) : (
                                <span>
                                    {' '}
                                    -{' '}
                                    <a
                                        onClick={() =>
                                            handleDeleteUser(user.id)
                                        }
                                        className="text-primary"
                                    >
                                        Delete
                                    </a>
                                </span>
                            )} */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Home;
