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



const middlewares = [
    thunk.withExtraArgument({ getFirebase, getFirestore })
]

// TODO
// if (process.env.NODE_ENV !== "production") {
//     middlewares = composeWithDevTools(applyMiddleware(thunkMiddleware))
// } else {
//     middlewares = applyMiddleware(thunkMiddleware)
// }

export default function configureStore(firebaseInstance: any) {
    return createStore(
        combineReducers({
            ...reducers,
            firebase: firebaseReducer,
            firestore: firestoreReducer,
        }),
        // (window as any).REDUX_INITIAL_DATA,
        // middleware
        compose(
            composeWithDevTools(applyMiddleware(...middlewares)),
            reduxFirestore(firebaseInstance),
        )
    )
}