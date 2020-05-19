import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';

import rootReducer from '../reducers/rootReducer';
import Alerts from './Alerts';

//it.only -> isolate test
//it.skip -> skip test

describe('<Alerts />', () => {
    let configureStore = null;
    //specifying initial state as normal user for this component
    let initialState = {
        alert: {
            message: 'Operation successful',
            type: 'is-success'
        }
    };

    beforeEach(() => {
        configureStore = (initialState = {}) =>
            createStore(rootReducer, initialState, applyMiddleware(thunk));
    });

    it('Close alert', () => {
        //since modal is already in document object and having display:none in css rule is-active
        //so this test is to match with existing snapshot to get expected behavior
        const history = createMemoryHistory();
        const { getByTestId, queryByTestId } = render(
            <Provider store={configureStore(initialState)}>
                <Router history={history}>
                    <Route component={Alerts} />
                </Router>
            </Provider>
        );
        expect(getByTestId('AlertMsg')).toBeInTheDocument();
        fireEvent.click(getByTestId('CloseAlert'));

        expect(queryByTestId('AlertMsg')).not.toBeInTheDocument();
    });
});
