import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ThemeContextProvider from './contexts/ThemeContext';

import reducer from './state/reducer';
// import * as types from './state/types';
import {
    createStore,
    // applyMiddleware,
    combineReducers
} from "redux";

import {
    Provider as ReduxProvider
} from "react-redux";

const reduxStore = createStore(
    reducer,
    // persistedState,
    // (window as any).REDUX_INITIAL_DATA,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    // applyMiddleware(),
);

const RootHtml = () => (
    <ThemeContextProvider>
        <ReduxProvider store={reduxStore} >
            <App />
        </ReduxProvider>
    </ThemeContextProvider>
);

ReactDOM.render(<RootHtml />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
