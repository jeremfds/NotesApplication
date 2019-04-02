import 'promise-polyfill/src/polyfill';
import './utils/array';
import './utils/object';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/index';

const app: any = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

render(app, document.getElementById('root'));
