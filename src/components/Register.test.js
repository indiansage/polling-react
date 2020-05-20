import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Register from './Register';
import Login from './Login';
import Alerts from './Alerts';
import rootReducer from '../reducers/rootReducer';

import { userService } from '../services/userService';

jest.mock('../services/userService');

describe('<Register />', () => {
    let configureStore = null;
    let history = null;
    let initialState = {};

    beforeEach(() => {
        configureStore = (initialState = {}) =>
            createStore(rootReducer, initialState, applyMiddleware(thunk));
        history = createMemoryHistory({ initialEntries: ['/register'] });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it('Renders input elements without crashing', () => {
        const { getByLabelText } = render(
            <Provider store={configureStore(initialState)}>
                <Router history={history}>
                    <Route component={Register} />
                </Router>
            </Provider>
        );

        expect(getByLabelText('Username')).toBeInTheDocument();
        expect(getByLabelText('Password')).toBeInTheDocument();
        expect(getByLabelText('Confirm Password')).toBeInTheDocument();
    });

    it('Goes to login page when Cancel button is pressed', () => {
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
        fireEvent.click(getByTestId('CancelRegister'));
        expect(getByTestId('Login')).toBeInTheDocument();
    });
    it('Fires Register API, switches to Login panel, and gives successful alert when we input username, password, confirm password fields', async () => {
        userService.register.mockResolvedValue({ ok: true });

        const { getByTestId, getByLabelText, getByText } = render(
            <Provider store={configureStore(initialState)}>
                <Router history={history}>
                    <Alerts />
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </Router>
            </Provider>
        );
        //console.log(getByLabelText('Username'));

        await userEvent.type(getByLabelText('Username'), 'testUser');
        await userEvent.type(getByLabelText('Password'), 'testUser1@');
        await userEvent.type(getByLabelText('Confirm Password'), 'testUser1@');
        fireEvent.click(getByTestId('ConfirmRegister'));
        await waitFor(() => {
            expect(userService.register).toHaveBeenCalledTimes(1);
        });
        expect(userService.register).toHaveBeenCalledWith({
            username: 'testUser',
            password: 'testUser1@',
            isAdmin: false
        });

        expect(getByText('Registration successful!')).toBeInTheDocument();
        expect(getByTestId('Login')).toBeInTheDocument();
    });
});
