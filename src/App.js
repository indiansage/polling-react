import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './helpers/store';
import 'bulma/css/bulma.css';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import history from './helpers/history';

import Login from './components/login';
import Welcome from './components/welcomePage';
import Register from './components/register';
import NavBar from './components/navBar';

function App() {
    return (
        <Provider store={configureStore()}>
            <Router history={history}>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
