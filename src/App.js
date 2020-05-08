import React from 'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import './sass/main.sass';
import history from './helpers/history';
import configureStore from './helpers/store';

import Login from './components/login';
import Welcome from './components/welcomePage';
import Register from './components/register';
import NavBar from './components/navBar';
import Alerts from './components/alerts';

function App() {
    return (
        <Provider store={configureStore()}>
            <Router history={history}>
                <div className="container">
                    <NavBar />
                    <Alerts />
                    <Switch>
                        <Route exact path="/" component={Welcome} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
