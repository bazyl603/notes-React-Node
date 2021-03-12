import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import './index.css';
import App from './components/App';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const app = (
    <Provider store={store}>
        <Router>
            <React.Suspense fallback={<div>Loading...</div>}>
            <App />
            </React.Suspense>
        </Router>
    </Provider>
);

ReactDOM.render(app, document.querySelector('#root'));
