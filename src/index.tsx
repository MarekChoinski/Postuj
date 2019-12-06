import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ThemeContextProvider from './contexts/ThemeContext';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import configureStore from "./state/store";
import { firebaseConfig } from './configs/firebaseConfig'

// import * as types from './state/types';
import {
    createStore,
    // applyMiddleware,
    combineReducers
} from "redux";

import {
    Provider as ReduxProvider
} from "react-redux";
import firebase from 'firebase';

firebase.initializeApp(firebaseConfig);
firebase.firestore();

// export default firebase;



const reduxStore = configureStore(firebase);

const RootHtml = () => (
    <ThemeContextProvider>
        <ReduxProvider store={reduxStore} >
            <ReactReduxFirebaseProvider
                firebase={firebase}
                config={{
                    userProfile: "users",
                    useFirestoreForProfile: true,
                }}
                dispatch={reduxStore.dispatch}
                createFirestoreInstance={createFirestoreInstance}>
                <App />
            </ReactReduxFirebaseProvider>
        </ReduxProvider>
    </ThemeContextProvider>
);

ReactDOM.render(<RootHtml />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
