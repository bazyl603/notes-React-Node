import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

ReactDOM.render(app, document.querySelector('#root'));
