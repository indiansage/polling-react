import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

//import configureStore from '../helpers/store';
import Home from './Home';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

//it.only -> isolate test
//it.skip -> skip test

describe('<Home />', () => {
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

    it('Compares with existing modal window snapshot when "Create Poll" button is clicked, ', () => {
        //since modal is already in document object and having display:none in css rule is-active
        //so this test is to match with existing snapshot to get expected behavior
        initialState.authentication.user.isAdmin = true;

        const { getByTestId } = render(
            <Provider store={configureStore(initialState)}>
                <Home />
            </Provider>
        );

        fireEvent.click(getByTestId('CreatePoll'));

        expect(getByTestId('CreatePollModal')).toMatchSnapshot();
    });
});
