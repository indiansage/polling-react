import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pollActions } from '../actions/pollActions';

const LivePoll = ({ poll }) => {
    const user = useSelector((state) => state.authentication.user);
    const closing = useSelector((state) => state.polls.closing);
    const voting = useSelector((state) => state.polls.voting);

    const [optionForm, setOptionForm] = useState('');

    const dispatch = useDispatch();

    const onRadioClick = (e) => {
        setOptionForm(e.target.value);
    };

    const onVoteClick = (e) => {
        e.preventDefault();
        if (optionForm) dispatch(pollActions.vote(poll.id, optionForm));
    };

    const onCloseClick = (e) => {
        e.preventDefault();
        dispatch(pollActions.closePoll(poll.id));
    };

    return (
        <div className="box">
            <article className="media">
                <div className="media-content">
                    <div className="content">
                        <strong>{poll.question}</strong>
                        <form className="pill-form">
                            {poll.options.map((option) => (
                                <label
                                    className="pill-label"
                                    key={option}
                                    disabled={user.isAdmin}
                                    onClick={onRadioClick}
                                >
                                    <input
                                        type="radio"
                                        className="pill-input"
                                        name={poll.id}
                                        disabled={user.isAdmin}
                                        value={option}
                                    />
                                    <span
                                        className="pill-span"
                                        disabled={user.isAdmin}
                                    >
                                        {option}
                                    </span>
                                </label>
                            ))}
                            <span className="buttons">
                                {!user.isAdmin && (
                                    <button
                                        className={
                                            'button is-primary is-light' +
                                            (voting && voting[poll.id]
                                                ? ' is-loading'
                                                : '')
                                        }
                                        onClick={onVoteClick}
                                        disabled={optionForm === ''}
                                    >
                                        <span>Vote</span>
                                        <span className="icon">
                                            <i className="fas fa-vote-yea"></i>
                                        </span>
                                    </button>
                                )}
                                {user.isAdmin && (
                                    <button
                                        className={
                                            'button is-primary' +
                                            (closing && closing[poll.id]
                                                ? ' is-loading'
                                                : '')
                                        }
                                        onClick={onCloseClick}
                                    >
                                        <span>Close</span>
                                        <span className="icon">
                                            <i className="fas fa-stopwatch"></i>
                                        </span>
                                    </button>
                                )}
                            </span>
                        </form>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default LivePoll;
