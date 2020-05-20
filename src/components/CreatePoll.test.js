import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import CreatePoll from './CreatePoll';
import rootReducer from '../reducers/rootReducer';
import { pollService } from '../services/pollService';
//import { userService } from '../services/userService';

jest.mock('../services/pollService');

describe('<CreatePoll />', () => {
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
        },
        polls: {
            showCreatePollModal: true
        }
    };

    beforeEach(() => {
        configureStore = (initialState = {}) =>
            createStore(rootReducer, initialState, applyMiddleware(thunk));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Sends single question with two options as expected', async () => {
        pollService.create.mockResolvedValue([]);
        pollService.getAll.mockResolvedValue([]);

        const { getByTestId, getByLabelText } = render(
            <Provider store={configureStore(initialState)}>
                <CreatePoll />
            </Provider>
        );
        await userEvent.type(
            getByLabelText('Question (1/1)'),
            'Best football team?'
        );
        await userEvent.type(getByLabelText('Option 1'), 'Real Madrid');
        await userEvent.type(getByLabelText('Option 2'), 'Manchester United');

        fireEvent.click(getByTestId('CreatePollConfirm'));

        await waitFor(() => {
            expect(pollService.create).toHaveBeenCalledTimes(1);
        });
        expect(pollService.create).toHaveBeenCalledWith([
            {
                live: true,
                options: ['Real Madrid', 'Manchester United'],
                question: 'Best football team?'
            }
        ]);
    });
});
