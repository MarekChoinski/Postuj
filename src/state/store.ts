import { applyMiddleware, compose, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
// import thunkMiddleware from "redux-thunk"
import thunk from "redux-thunk"
import { getFirebase } from 'react-redux-firebase'
import { getFirestore, reduxFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import { firebaseConfig } from '../configs/firebaseConfig';

import * as reducers from "./ducks"
import { StateAll } from "./ducks/types"

const extraArguments = { getFirebase, getFirestore };
type extraArgs = typeof extraArguments;

const middlewares = [
    thunk.withExtraArgument(extraArguments)
]

export interface State extends StateAll {
    firebase: any;
    firestore: any;
}

export default function configureStore(firebaseInstance: any) {
    return createStore(
        combineReducers({
            ...reducers,
            firebase: firebaseReducer,
            firestore: firestoreReducer,
        }),
        compose(
            (process.env.NODE_ENV !== "production") ?
                composeWithDevTools(applyMiddleware(...middlewares))
                : applyMiddleware(...middlewares),
            reduxFirestore(firebaseInstance),
        )
    )
}