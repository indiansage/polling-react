import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// setup fake backend
import { configureFakeBackend } from './helpers/fake-backend';
configureFakeBackend();

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
