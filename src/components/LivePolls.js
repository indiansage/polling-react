import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreatePoll from './CreatePoll';

const LivePolls = () => {
    const user = useSelector((state) => state.authentication.user);
    const polls = useSelector((state) => state.polls);
    const { livePolls } = polls;
    const [createPollModal, setCreatePollModal] = useState(false);

    const handleCreatePollClick = (e) => {
        e.preventDefault();
        setCreatePollModal(true);
    };

    const handleCreatePollClose = (e) => {
        e.preventDefault();
        setCreatePollModal(false);
    };

    return (
        <>
            {' '}
            <CreatePoll
                createPollModal={createPollModal}
                handleCreatePollClose={handleCreatePollClose}
            />
            <section className="section">
                <div className="box">
                    <div className="container">
                        <div className="level">
                            <div className="level-left">
                                <div className="level-item">
                                    <h1 className="title">Currently live</h1>
                                </div>
                            </div>

                            {user.isAdmin && (
                                <div className="level-right">
                                    <div className="level-item">
                                        <button
                                            className="button is-primary"
                                            onClick={handleCreatePollClick}
                                        >
                                            <span>Create a poll</span>
                                            <span className="icon">
                                                <i className="fas fa-plus" />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {polls.loading && (
                            <progress
                                className="progress is-primary"
                                max="100"
                            />
                        )}
                        {!polls.loading && livePolls && livePolls.length === 0 && (
                            <h2 className="subtitle has-text-centered">
                                <span>No polls found </span>
                                <span className="icon">
                                    <i className="fas fa-thumbs-down" />
                                </span>
                            </h2>
                        )}
                        {livePolls && (
                            <ul>
                                {livePolls.map((poll, index) => (
                                    <li key={poll.id}>
                                        <div className="column is-4">
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
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default LivePolls;
