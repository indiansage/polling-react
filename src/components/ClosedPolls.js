import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
                    {closedPolls && (
                        <ul>
                            {closedPolls.map((poll, index) => (
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
    );
};

export default ClosedPolls;
