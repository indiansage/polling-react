import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pollActions } from '../actions/pollActions';

const CreatePoll = ({ createPollModal, handleCreatePollClose }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);

    const [submitted, setSubmitted] = useState(false);

    const creating = useSelector((state) => state.authentication.loggingIn);
    const dispatch = useDispatch();

    function addOption(e) {
        e.preventDefault();
        setOptions([...options, '']);
    }

    function removeOption(e) {
        e.preventDefault();
        const updatedOptions = [...options];
        updatedOptions.pop();
        setOptions(updatedOptions);
    }

    function handleChangeQuestion(e) {
        setQuestion(e.target.value);
    }

    function handleChangeOptions(e) {
        const updatedOptions = [...options];

        const splitName = e.target.name.split('-');
        const index = splitName[splitName.length - 1];
        updatedOptions[index] = e.target.value;

        setOptions(updatedOptions);
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (question) {
            dispatch(pollActions.create(question, options));
        }
    }

    return (
        <div className={'modal' + (createPollModal ? ' is-active' : '')}>
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Create a poll</p>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Question</label>
                            <div className="control">
                                <textarea
                                    name="question"
                                    value={question}
                                    onChange={handleChangeQuestion}
                                    className="textarea"
                                />
                                {submitted && !question && (
                                    <p className="help is-danger">
                                        Question is required
                                    </p>
                                )}
                            </div>
                        </div>
                        {options.map((val, index) => {
                            const optionId = `option-${index}`;
                            return (
                                <div className="field" key={optionId}>
                                    <label className="label">{`Option ${
                                        index + 1
                                    }`}</label>
                                    <input
                                        type="text"
                                        name={optionId}
                                        className="input"
                                        onChange={handleChangeOptions}
                                    />
                                    {submitted && !options[index] && (
                                        <p className="help is-danger">
                                            {`Option ${index + 1} is required`}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                        <div className="buttons is-pulled-right">
                            <button
                                className="button is-primary"
                                onClick={addOption}
                            >
                                <span className="icon">
                                    <i className="fas fa-plus"></i>
                                </span>
                            </button>
                            <button
                                className="button is-primary"
                                onClick={removeOption}
                                disabled={options.length < 3}
                            >
                                <span className="icon">
                                    <i className="fas fa-minus"></i>
                                </span>
                            </button>
                        </div>
                    </form>
                </section>
                <footer className="modal-card-foot">
                    <button
                        className={
                            'button is-primary' +
                            (creating ? ' is-loading' : '')
                        }
                    >
                        <span>Create</span>
                        <span className="icon">
                            <i className="fas fa-check" />
                        </span>
                    </button>
                    <button className="button" onClick={handleCreatePollClose}>
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default CreatePoll;
