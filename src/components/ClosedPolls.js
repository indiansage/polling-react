import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClosedPoll from './ClosedPoll';

const ClosedPolls = () => {
    const polls = useSelector((state) => state.polls);
    const { closedPolls } = polls;
    return (
        <section className="section">
            <div className="box">
                <div className="container">
                    <h1 className="title has-text-centered-mobile">Closed</h1>
                    {polls.loading && (
                        <progress className="progress is-primary" max="100" />
                    )}
                    {!polls.loading && closedPolls && closedPolls.length === 0 && (
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
                    {closedPolls && !polls.loading && (
                        <div className="columns is-multiline">
                            {closedPolls.map((poll, index) => (
                                <div className="column is-4" key={poll.id}>
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
