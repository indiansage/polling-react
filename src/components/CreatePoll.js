import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pollActions } from '../actions/pollActions';

const CreatePoll = () => {
    const [questions, setQuestions] = useState(['']);
    const [options, setOptions] = useState([['', '']]);
    const [duplicateValidationQFlags, setDuplicateValidationQFlags] = useState(
        []
    );
    const [duplicateValidationFlags, setDuplicateValidationFlags] = useState([
        []
    ]);
    const [currentPage, setCurrentPage] = useState(0); //first page is 0

    const [submitted, setSubmitted] = useState(false);

    const creating = useSelector((state) => state.polls.creating);
    const showCreatePollModal = useSelector(
        (state) => state.polls.showCreatePollModal
    );
    const dispatch = useDispatch();

    const clearFormValues = (fromLivePolls = false) => {
        const updatedQuestions = questions;
        updatedQuestions[currentPage] = '';
        setQuestions(updatedQuestions);
        if (fromLivePolls) {
            setQuestions(['']);
            setOptions([['', '']]);
            setCurrentPage(0);
        } else {
            const updatedQuestions = [...questions];
            updatedQuestions[currentPage] = '';
            setQuestions(updatedQuestions);
            const updatedOptions = [...options];
            updatedOptions[currentPage] = updatedOptions[currentPage].map(
                () => ''
            );
            setOptions(updatedOptions);
        }

        setSubmitted(false);
    };

    useEffect(() => {
        clearFormValues(true);
        setSubmitted(false);
    }, [showCreatePollModal]);

    function addQuestion(e) {
        e.preventDefault();
        let updatedQuestions = [...questions, ''];
        setQuestions(updatedQuestions);
        setSubmitted(false);
    }

    useEffect(() => {
        if (options.length < questions.length) {
            let updatedOptions = [...options];
            updatedOptions.push(['', '']);
            setOptions(updatedOptions);
            setCurrentPage(questions.length - 1);
        }
        if (options.length > questions.length) {
            let updatedOptions = [...options];
            updatedOptions.pop();
            setOptions(updatedOptions);
        }
    }, [questions]);

    function removeQuestion(e) {
        e.preventDefault();
        const updatedQuestions = [...questions];

        updatedQuestions.pop();
        if (updatedQuestions.length === currentPage) {
            setCurrentPage(currentPage - 1);
        }
        setQuestions(updatedQuestions);
    }

    function nextPage(e) {
        e.preventDefault();
        setCurrentPage((currentPage + 1) % questions.length);
    }

    function prevPage(e) {
        e.preventDefault();
        let page = currentPage - 1;
        if (page < 0) {
            setCurrentPage(questions.length + page);
        } else {
            setCurrentPage(page);
        }
    }

    function addOption(e) {
        e.preventDefault();
        const updatedOptions = [...options];
        updatedOptions[currentPage] = [...updatedOptions[currentPage], ''];
        setOptions(updatedOptions);
    }

    function removeOption(e) {
        e.preventDefault();
        const updatedOptions = [...options];
        updatedOptions[currentPage] = [...updatedOptions[currentPage]];
        updatedOptions[currentPage].pop();
        setOptions(updatedOptions);
    }

    function handleChangeQuestion(e) {
        const updatedQuestions = [...questions];
        updatedQuestions[currentPage] = e.target.value;
        setQuestions(updatedQuestions);
    }

    function handleChangeOptions(e) {
        const updatedOptions = [...options];
        updatedOptions[currentPage] = [...updatedOptions[currentPage]];
        const splitName = e.target.name.split('-');
        const index = splitName[splitName.length - 1];
        updatedOptions[currentPage][index] = e.target.value;

        setOptions(updatedOptions);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const polls = [];

        //validate duplicate options in form
        let noDuplicates = true;
        let firstDuplicate = -1;
        questions.forEach((_questionVal, questionIndex, questionsArr) => {
            let duplicateCountMapArray = new Array(questionsArr.length);
            duplicateCountMapArray[questionIndex] = new Map();
            let duplicateFlags = new Array(questionsArr.length);
            options[questionIndex].forEach((option) => {
                if (duplicateCountMapArray[questionIndex].has(option)) {
                    duplicateCountMapArray[questionIndex].set(
                        option,
                        duplicateCountMapArray[questionIndex].get(option) + 1
                    );
                    noDuplicates = false;
                    firstDuplicate = questionIndex;
                } else {
                    duplicateCountMapArray[questionIndex].set(option, 1);
                }
            });
            options[questionIndex].forEach((option, index) => {
                if (!duplicateFlags[questionIndex]) {
                    duplicateFlags[questionIndex] = [];
                }
                duplicateFlags[questionIndex][index] =
                    duplicateCountMapArray[questionIndex].get(option) > 1
                        ? true
                        : false;
            });
            setDuplicateValidationFlags(duplicateFlags);

            polls.push({
                question: questions[questionIndex],
                options: options[questionIndex]
            });
        });

        //validate duplicate questions in form
        let noDuplicateQs = true;
        let duplicateFlagQs = [];
        let firstDuplicateQ = -1;
        let duplicateCountMapQ = new Map();
        questions.forEach((question, index) => {
            if (duplicateCountMapQ.has(question)) {
                duplicateCountMapQ.set(
                    question,
                    duplicateCountMapQ.get(question) + 1
                );
                noDuplicates = false;
                firstDuplicateQ = index;
            } else {
                duplicateCountMapQ.set(question, 1);
            }
        });
        questions.forEach((option, index) => {
            duplicateFlagQs[index] =
                duplicateCountMapQ.get(option) > 1 ? true : false;
        });
        setDuplicateValidationQFlags(duplicateFlagQs);

        setSubmitted(true);
        if (!questions.every((val) => val)) {
            setCurrentPage(questions.findIndex((val) => !val));
        } else if (!noDuplicateQs) {
            setCurrentPage(firstDuplicateQ);
        } else if (!options.every((arr) => arr.every((val) => val))) {
            setCurrentPage(
                options.findIndex((arr) => !arr.every((val) => val))
            );
        } else if (!noDuplicates) {
            setCurrentPage(firstDuplicate);
        } else {
            //console.log(polls);
            dispatch(pollActions.createPoll(polls));
        }
    }

    // console.log(
    //     options[currentPage] &&
    //         options[currentPage][1] &&
    //         duplicateValidationFlags[currentPage] &&
    //         duplicateValidationFlags[currentPage][1]
    // );

    return (
        <div
            className={'modal' + (showCreatePollModal ? ' is-active' : '')}
            data-testid="CreatePollModal"
        >
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Create a poll</p>
                    <div className="buttons">
                        <button
                            className="button is-primary"
                            onClick={addQuestion}
                            disabled={questions.length === 5}
                        >
                            <span>Question</span>
                            <span className="icon">
                                <i className="fas fa-plus" />
                            </span>
                        </button>
                        <button
                            className="button is-primary"
                            onClick={removeQuestion}
                            disabled={questions.length === 1}
                        >
                            <span>Question</span>
                            <span className="icon">
                                <i className="fas fa-minus" />
                            </span>
                        </button>
                    </div>
                </header>

                <section className="modal-card-body create-poll-modal-body">
                    <button
                        className="button create-poll-modal-arrow"
                        style={{ marginRight: '1rem' }}
                        onClick={prevPage}
                        disabled={questions.length === 1}
                    >
                        <span className="icon">
                            <i className="fas fa-arrow-left"></i>
                        </span>
                    </button>

                    <form
                        onSubmit={handleSubmit}
                        className="create-poll-modal-form"
                    >
                        <div className="field">
                            <label className="label">
                                {`Question (${currentPage + 1}/${
                                    questions.length
                                })`}
                                <div className="control">
                                    <textarea
                                        name="question"
                                        value={questions[currentPage]}
                                        onChange={handleChangeQuestion}
                                        className="textarea"
                                    />
                                </div>
                            </label>
                            {submitted && !questions[currentPage] && (
                                <p className="help is-danger">
                                    Question is required
                                </p>
                            )}
                            {submitted &&
                                questions[currentPage] &&
                                duplicateValidationQFlags[currentPage] && (
                                    <p className="help is-danger">
                                        {'Questions cannot be identical.'}
                                    </p>
                                )}
                        </div>
                        {options[currentPage] &&
                            options[currentPage].map((_val, index) => {
                                const optionId = `option-${index}`;
                                return (
                                    <div className="field" key={optionId}>
                                        <label className="label">
                                            {`Option ${index + 1}`}
                                            <input
                                                type="text"
                                                name={optionId}
                                                className="input"
                                                onChange={handleChangeOptions}
                                                value={
                                                    options[currentPage] &&
                                                    options[currentPage][index]
                                                }
                                            />
                                        </label>
                                        {submitted &&
                                            !(
                                                options[currentPage] &&
                                                options[currentPage][index]
                                            ) && (
                                                <p className="help is-danger">
                                                    {index > 1
                                                        ? `Option ${
                                                              index + 1
                                                          } is required. Remove if not required.`
                                                        : `Option ${
                                                              index + 1
                                                          } is required.`}
                                                </p>
                                            )}
                                        {submitted &&
                                            options[currentPage] &&
                                            options[currentPage][index] &&
                                            duplicateValidationFlags[
                                                currentPage
                                            ] &&
                                            duplicateValidationFlags[
                                                currentPage
                                            ][index] && (
                                                <p className="help is-danger">
                                                    {
                                                        'Options cannot be identical.'
                                                    }
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
                                <span>Option</span>
                                <span className="icon">
                                    <i className="fas fa-plus"></i>
                                </span>
                            </button>
                            <button
                                className="button is-primary"
                                onClick={removeOption}
                                disabled={
                                    options[currentPage] &&
                                    options[currentPage].length < 3
                                }
                            >
                                <span>Option</span>
                                <span className="icon">
                                    <i className="fas fa-minus"></i>
                                </span>
                            </button>
                        </div>
                    </form>

                    <button
                        className="button create-poll-modal-arrow"
                        style={{ marginLeft: '1rem' }}
                        onClick={nextPage}
                        disabled={questions.length === 1}
                    >
                        <span className="icon">
                            <i className="fas fa-arrow-right"></i>
                        </span>
                    </button>
                </section>

                <footer className="modal-card-foot">
                    <button
                        className={
                            'button is-primary' +
                            (creating ? ' is-loading' : '')
                        }
                        onClick={handleSubmit}
                        data-testid="CreatePollConfirm"
                    >
                        <span>Create</span>
                        <span className="icon">
                            <i className="fas fa-check" />
                        </span>
                    </button>

                    <button
                        className="button"
                        onClick={() => {
                            dispatch(pollActions.toggleCreatePollModal());
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        className="button"
                        onClick={() => clearFormValues()}
                    >
                        Clear
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default CreatePoll;
