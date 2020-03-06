import { applyMiddleware, compose, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { getFirebase } from 'react-redux-firebase'
import { getFirestore, reduxFirestore } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore';

import * as reducers from "./ducks"

const extraArguments = { getFirebase, getFirestore };

const middlewares = [
    thunk.withExtraArgument(extraArguments)
]

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