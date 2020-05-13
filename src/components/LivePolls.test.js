import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

//import configureStore from '../helpers/store';
import LivePolls from './LivePolls';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';

//it.only -> isolate test
//it.skip -> skip test

describe('<LivePolls />', () => {
    let configureStore = null;
    //specifying initial state as normal user for this component
    let initialState = {
        authentication: {
            user: {
                id: 1,
                username: 'raktim',
                isAdmin: false,
                token: 'fake-jwt-token-1'
            }
        }
    };

    beforeEach(() => {
        configureStore = (initialState = {}) =>
            createStore(rootReducer, initialState, applyMiddleware(thunk));
    });

    it('Renders without crashing', () => {
        const { getByTestId } = render(
            <Provider store={configureStore(initialState)}>
                <LivePolls />
            </Provider>
        );
        expect(getByTestId('LivePolls')).toBeInTheDocument();
    });

    it('Shows progress bar while loading polls', () => {
        initialState.polls = { loading: true };

        const { getByTestId } = render(
            <Provider store={configureStore(initialState)}>
                <LivePolls />
            </Provider>
        );
        expect(getByTestId('progressBar')).toBeInTheDocument();
    });

    it('Writes "no polls found" when API fetches empty array', () => {
        initialState.polls = { loading: false, livePolls: [] };

        const { getByText } = render(
            <Provider store={configureStore(initialState)}>
                <LivePolls />
            </Provider>
        );
        expect(getByText('No polls found')).toBeInTheDocument();
    });

    it('Renders all live polls when API fetches non-empty array', () => {
        initialState.polls = {
            loading: false,
            livePolls: [
                {
                    question: 'Abc?',
                    options: ['a', 'b', 'c'],
                    live: true,
                    id: 1
                },
                {
                    question: 'Defg?',
                    options: ['d', 'e', 'f', 'g'],
                    live: true,
                    id: 2
                },
                {
                    question: 'Hijkl?',
                    options: ['h', 'i', 'j', 'k', 'l'],
                    live: true,
                    id: 3
                }
            ]
        };
        initialState.authentication.user.isAdmin = true;

        const { getAllByTestId } = render(
            <Provider store={configureStore(initialState)}>
                <LivePolls />
            </Provider>
        );
        getAllByTestId('LivePollElement').forEach((element) =>
            expect(element).toBeInTheDocument()
        );
    });

    it('Renders "Create poll" button for Admin user', () => {
        initialState.polls = { loading: false, livePolls: [] };
        initialState.authentication.user.isAdmin = true;

        const { getByTestId } = render(
            <Provider store={configureStore(initialState)}>
                <LivePolls />
            </Provider>
        );
        expect(getByTestId('CreatePoll')).toBeInTheDocument();
    });
});
