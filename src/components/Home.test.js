import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Home from './Home';
import rootReducer from '../reducers/rootReducer';
import { pollService } from '../services/pollService';
import { userService } from '../services/userService';

jest.mock('../services/pollService');
jest.mock('../services/userService');

//it.only -> isolate test
//it.skip -> skip test

describe('<Home /> for admin user', () => {
    let configureStore = null;
    //specifying initial state as normal user for this component
    let initialState = {
        authentication: {
            user: {
                id: 1,
                username: 'test-admin-user',
                isAdmin: true,
                token: 'fake-jwt-token-admin-1'
            }
        }
    };

    beforeEach(() => {
        configureStore = (initialState = {}) =>
            createStore(rootReducer, initialState, applyMiddleware(thunk));
        pollService.getAll.mockResolvedValue([
            {
                question: 'sdfsdf',
                options: ['asd', 'aw', 'cc'],
                live: true,
                id: 1
            },
            {
                question: 'eef',
                options: ['ww', 'qqq'],
                live: false,
                id: 2
            },
            {
                question: 'asdasd',
                options: ['qwedq', 'frwc', 'vvv'],
                live: true,
                id: 3
            },
            {
                question: 'qecqec',
                options: ['zcc', 'vwrvwr', 'vvv'],
                live: true,
                id: 4
            },
            {
                question: 'asasd',
                options: ['dwq', 'xsax'],
                live: true,
                id: 5
            }
        ]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Compares with existing modal window snapshot when "Create Poll" button is clicked', () => {
        //since modal is already in document object and having display:none in css rule is-active
        //so this test is to match with existing snapshot to get expected behavior

        const { getByTestId } = render(
            <Provider store={configureStore(initialState)}>
                <Home />
            </Provider>
        );

        fireEvent.click(getByTestId('CreatePoll'));

        expect(getByTestId('CreatePollModal')).toMatchSnapshot();
    });

    it('Shows Live Polls tab at start', () => {
        const { getByText } = render(
            <Provider store={configureStore(initialState)}>
                <Home />
            </Provider>
        );

        expect(getByText('Currently live')).toBeInTheDocument();
    });

    it('Fires close poll API on clicking "Close"', async () => {
        pollService.close.mockResolvedValue([]);
        const { getAllByTestId } = render(
            <Provider store={configureStore(initialState)}>
                <Home />
            </Provider>
        );
        await waitFor(() => {
            expect(pollService.getAll).toHaveBeenCalledTimes(1);
        });
        fireEvent.click(getAllByTestId('CloseButton')[0]);
        expect(pollService.close).toHaveBeenCalledWith(1); //mock value of id from our mock response
        expect(pollService.close).toHaveBeenCalledTimes(1);
    });

    it('Switches to Closed tab when clicked', () => {
        pollService.getAllClosedPollsWithVotes.mockResolvedValue([
            {
                qid: 2,
                question: 'How many months till the new iPhone?',
                options: {
                    Six: 4,
                    Four: 2,
                    Two: 17
                }
            },
            {
                qid: 6,
                question: 'How did Jon Snow die?',
                options: {
                    Stabbing: 5,
                    Beheading: 2,
                    Alive: 45
                }
            }
        ]);
        const { getByTestId } = render(
            <Provider store={configureStore(initialState)}>
                <Home />
            </Provider>
        );

        fireEvent.click(getByTestId('ClosedTab'));

        expect(getByTestId('ClosedTitle')).toBeInTheDocument();
    });

    it('Switches to List of Users tab when clicked', () => {
        userService.getAllUsers.mockResolvedValue([
            {
                username: 'admin',
                isAdmin: true,
                id: 1
            },
            {
                username: '1',
                isAdmin: false,
                id: 2
            },
            {
                username: '2',
                isAdmin: false,
                id: 3
            },
            {
                username: '3',
                isAdmin: false,
                id: 4
            }
        ]);
        const { getByTestId } = render(
            <Provider store={configureStore(initialState)}>
                <Home />
            </Provider>
        );

        fireEvent.click(getByTestId('ListOfUsersTab'));

        expect(getByTestId('ListOfUsers')).toBeInTheDocument();
    });

    it('Switches to Live tab when clicked', () => {
        const { getByTestId, getByText } = render(
            <Provider store={configureStore(initialState)}>
                <Home />
            </Provider>
        );

        fireEvent.click(getByTestId('ListOfUsersTab'));
        fireEvent.click(getByTestId('LiveTab'));
        expect(getByText('Currently live')).toBeInTheDocument();

        fireEvent.click(getByTestId('ClosedTab'));
        fireEvent.click(getByTestId('LiveTab'));
        expect(getByText('Currently live')).toBeInTheDocument();
    });

    it('Renders live polls correctly on providing mock response from API', async () => {
        //mock all polls response -> five polls, four live
        //expectation -> four live polls rendered

        const history = createMemoryHistory({ initialEntries: ['/'] });
        const { getAllByTestId } = render(
            <Provider store={configureStore(initialState)}>
                <Router history={history}>
                    <Route component={Home} />
                </Router>
            </Provider>
        );
        expect(pollService.getAll).toHaveBeenCalledTimes(1);
        await waitFor(() => {
            expect(getAllByTestId('LivePollElement')).toHaveLength(4);
        });
    });
});

describe('<Home /> for normal user', () => {
    let configureStore = null;
    //specifying initial state as normal user for this component
    let initialState = {
        authentication: {
            user: {
                id: 1,
                username: 'test-user',
                isAdmin: false,
                token: 'fake-jwt-token-1'
            }
        }
    };

    beforeEach(() => {
        configureStore = (initialState = {}) =>
            createStore(rootReducer, initialState, applyMiddleware(thunk));
        pollService.getAll.mockResolvedValue([
            {
                question: 'sdfsdf',
                options: ['asd', 'aw', 'cc'],
                live: true,
                id: 1
            },
            {
                question: 'asdasd',
                options: ['qwedq', 'frwc', 'vvv'],
                live: true,
                id: 3
            },
            {
                question: 'qecqec',
                options: ['zcc', 'vwrvwr', 'vvv'],
                live: true,
                id: 4
            },
            {
                question: 'asasd',
                options: ['dwq', 'xsax'],
                live: true,
                id: 5
            }
        ]);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('Shows Live Polls tab at start', () => {
        const { getByText } = render(
            <Provider store={configureStore(initialState)}>
                <Home />
            </Provider>
        );

        expect(getByText('Currently live')).toBeInTheDocument();
    });

    it('Fires vote API on clicking "Vote"', async () => {
        pollService.vote.mockResolvedValue([]);
        const { getAllByTestId } = render(
            <Provider store={configureStore(initialState)}>
                <Home />
            </Provider>
        );
        await waitFor(() => {
            expect(pollService.getAll).toHaveBeenCalledTimes(1);
        });
        fireEvent.click(getAllByTestId('radioButton')[0]); //pick first option of first poll
        fireEvent.click(getAllByTestId('VoteButton')[0]); //pick first poll
        expect(pollService.vote).toHaveBeenCalledWith(1, 'asd'); //mock value of id and option from our mock response
        expect(pollService.vote).toHaveBeenCalledTimes(1);
    });
});
