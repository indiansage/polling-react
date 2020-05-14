import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';

import Login from './Login';
import rootReducer from '../reducers/rootReducer';

//it.only -> isolate test
//it.skip -> skip test

describe('<Login />', () => {
    let configureStore = null;

    let initialState = {};

    beforeEach(() => {
        configureStore = (initialState = {}) =>
            createStore(rootReducer, initialState, applyMiddleware(thunk));
    });

    it('Renders main div without crashing', () => {
        const history = createMemoryHistory();
        const { getByTestId } = render(
            <Provider store={configureStore(initialState)}>
                <Router history={history}>
                    <Route component={Login} />
                </Router>
            </Provider>
        );
        expect(getByTestId('Login')).toBeInTheDocument();
    });

    // it('Renders main div without crashing', () => {
    //     const history = createMemoryHistory();
    //     const { getByTestId } = render(
    //         <Provider store={configureStore(initialState)}>
    //             <Router history={history}>
    //                 <Route component={Login} />
    //             </Router>
    //         </Provider>
    //     );
    //     expect(getByTestId('Login')).toBeInTheDocument();
    // });
});
