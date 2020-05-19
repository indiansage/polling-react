import React from 'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './sass/main.sass';
import configureStore from './helpers/store';

import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import Alerts from './components/Alerts';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <div data-testid="App">
            <Provider store={configureStore()}>
                <Router>
                    <NavBar />
                    <Alerts />
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <PrivateRoute exact path="/" component={Home} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </Provider>
        </div>
    );
}

export default App;
