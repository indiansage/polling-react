import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pollActions } from '../actions/pollActions';

const CreatePoll = ({ createPollModal, handleCreatePollClose }) => {
    const [inputs, setInputs] = useState({
        question: '',
        options: ['', '']
    });
    const [submitted, setSubmitted] = useState(false);
    const { question, options } = inputs;

    const creating = useSelector((state) => state.authentication.loggingIn);

    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    }

    function handleChangeOptions(e) {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (question && options[0] && options[1]) {
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
                                    onChange={handleChange}
                                    className="textarea"
                                />
                                {submitted && !question && (
                                    <p className="help is-danger">
                                        Question is required
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Option 1</label>
                            <div className="control">
                                <input
                                    type="text"
                                    name="option0"
                                    value={options[0]}
                                    onChange={handleChangeOptions}
                                    className="input"
                                />
                                {submitted && !options[0] && (
                                    <p className="help is-danger">
                                        Option 1 is required
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Option 2</label>
                            <div className="control">
                                <input
                                    type="text"
                                    name="option1"
                                    value={options[1]}
                                    onChange={handleChangeOptions}
                                    className="input"
                                />
                                {submitted && !options[1] && (
                                    <p className="help is-danger">
                                        Option 2 is required
                                    </p>
                                )}
                            </div>
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
