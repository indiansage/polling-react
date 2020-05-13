import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ClosedPoll from './ClosedPoll';
import { pollActions } from '../actions/pollActions';

const ClosedPolls = () => {
    const dispatch = useDispatch();
    const closedPollsWithVotes = useSelector(
        (state) => state.polls.closedPollsWithVotes
    );
    console.log('closedPollsWithVotes', closedPollsWithVotes);
    useEffect(() => {
        dispatch(pollActions.getClosedPollsWithVotes());
    }, []);

    //const { closedPolls } = polls;
    return (
        <section className="section">
            <div className="box">
                <div className="container">
                    <h1 className="title has-text-centered-mobile">Closed</h1>
                    {closedPollsWithVotes && closedPollsWithVotes.loading && (
                        <progress className="progress is-primary" max="100" />
                    )}
                    {closedPollsWithVotes &&
                        !closedPollsWithVotes.loading &&
                        closedPollsWithVotes.items.length === 0 && (
                            <>
                                <br />
                                <h2 className="subtitle has-text-centered">
                                    <span>No polls found </span>
                                    <span className="icon">
                                        <i className="fas fa-thumbs-down" />
                                    </span>
                                </h2>
                            </>
                        )}
                    {closedPollsWithVotes && !closedPollsWithVotes.loading && (
                        <div className="columns is-multiline">
                            {closedPollsWithVotes.items.map((poll, index) => (
                                <div className="column is-4" key={poll.qid}>
                                    <ClosedPoll poll={poll} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ClosedPolls;
