import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';

import rootReducer from '../reducers/rootReducer';
import ClosedPolls from './ClosedPolls';
import { pollService } from '../services/pollService';

jest.mock('../services/pollService');
describe('<ClosedPolls />', () => {
    let configureStore = null;
    let initialState = {};

    beforeEach(() => {
        configureStore = (initialState = {}) =>
            createStore(rootReducer, initialState, applyMiddleware(thunk));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Renders two polls on providing mock response of two closed polls from API', async () => {
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
        const history = createMemoryHistory({ initialEntries: ['/'] });
        const { getAllByTestId } = render(
            <Provider store={configureStore(initialState)}>
                <Router history={history}>
                    <Route component={ClosedPolls} />
                </Router>
            </Provider>
        );
        expect(pollService.getAllClosedPollsWithVotes).toHaveBeenCalledTimes(1);
        await waitFor(() => {
            expect(getAllByTestId('PieChart')).toHaveLength(2);
        });
    });

    it("Renders 'No polls found' on providing mock response of zero polls from API", async () => {
        pollService.getAllClosedPollsWithVotes.mockResolvedValue([]);
        const history = createMemoryHistory({ initialEntries: ['/'] });
        const { getByText } = render(
            <Provider store={configureStore(initialState)}>
                <Router history={history}>
                    <Route component={ClosedPolls} />
                </Router>
            </Provider>
        );
        expect(pollService.getAllClosedPollsWithVotes).toHaveBeenCalledTimes(1);
        await waitFor(() => {
            expect(getByText('No polls found')).toBeInTheDocument();
        });
    });
});
