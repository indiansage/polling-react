import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pollActions } from '../actions/pollActions';
import CreatePoll from './CreatePoll';
import LivePoll from './LivePoll';

const LivePolls = () => {
    const user = useSelector((state) => state.authentication.user);
    const polls = useSelector((state) => state.polls);
    const { livePolls } = polls;

    //console.log(polls);
    //console.log(livePolls);

    const dispatch = useDispatch();

    const handleCreatePollClick = (e) => {
        e.preventDefault();
        dispatch(pollActions.toggleCreatePollModal());
    };

    return (
        <div data-testid="LivePolls">
            <CreatePoll />
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
                                            data-testid="CreatePoll"
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
                                data-testid="progressBar"
                            />
                        )}
                        {!polls.loading && livePolls && livePolls.length === 0 && (
                            <h2 className="subtitle has-text-centered">
                                <span>No polls found</span>
                                <span className="icon">
                                    <i className="fas fa-thumbs-down" />
                                </span>
                            </h2>
                        )}
                        {livePolls && !polls.loading && (
                            <div className="columns is-multiline">
                                {livePolls.map((poll, index) => (
                                    <div
                                        className="column is-4"
                                        key={poll.id}
                                        data-testid="LivePollElement"
                                    >
                                        <LivePoll poll={poll} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LivePolls;
