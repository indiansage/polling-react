import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, Switch, Redirect } from 'react-router';
import { createMemoryHistory } from 'history';

import Login from './Login';
import Register from './Register';
import Alerts from './Alerts';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import rootReducer from '../reducers/rootReducer';

import { userService } from '../services/userService';
import { pollService } from '../services/pollService';

jest.mock('../services/userService');
jest.mock('../services/pollService');

//it.only -> isolate test
//it.skip -> skip test

describe('<Login />', () => {
    let configureStore = null;
    let history = null;
    let initialState = {};

    beforeEach(() => {
        configureStore = (initialState = {}) =>
            createStore(rootReducer, initialState, applyMiddleware(thunk));
        history = createMemoryHistory({ initialEntries: ['/login'] });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Renders input elements without crashing', () => {
        const { getByLabelText } = render(
            <Provider store={configureStore(initialState)}>
                <Router history={history}>
                    <Route component={Login} />
                </Router>
            </Provider>
        );

        expect(getByLabelText('Username')).toBeInTheDocument();
        expect(getByLabelText('Password')).toBeInTheDocument();
    });

    it('Goes to register page when Sign Up button is clicked', () => {
        const { getByTestId } = render(
            <Provider store={configureStore(initialState)}>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </Router>
            </Provider>
        );
        fireEvent.click(getByTestId('SignUpButton'));
        expect(getByTestId('Register')).toBeInTheDocument();
    });

    it('Fires Login API, switches to Home panel, and gives successful alert when we input username, password fields that exist in DB', async () => {
        userService.login.mockResolvedValue({
            id: 3,
            username: 'testUser',
            isAdmin: false,
            token: 'fake-jwt-token-3'
        });
        localStorage.getItem.mockResolvedValue(true);
        pollService.getAll.mockResolvedValue([]);

        const { getByTestId, getByLabelText, getByText } = render(
            <Provider store={configureStore(initialState)}>
                <Router history={history}>
                    <Alerts />
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <PrivateRoute exact path="/" component={Home} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </Provider>
        );
        //console.log(getByLabelText('Username'));

        await userEvent.type(getByLabelText('Username'), 'testUser');
        await userEvent.type(getByLabelText('Password'), 'testUser1@');

        fireEvent.click(getByTestId('LoginConfirm'));
        await waitFor(() => {
            expect(userService.login).toHaveBeenCalledTimes(1);
            expect(userService.login).toHaveBeenCalledWith(
                'testUser',
                'testUser1@'
            );
        });
        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith(
                'user',
                '{"id":3,"username":"testUser","isAdmin":false,"token":"fake-jwt-token-3"}'
            );
        });

        expect(localStorage.getItem).toHaveBeenCalledWith('user');
        expect(getByText('Logged in successfully!')).toBeInTheDocument();
        expect(getByTestId('UserHome')).toBeInTheDocument();
        expect(pollService.getAll).toHaveBeenCalledTimes(1);
    });
});
