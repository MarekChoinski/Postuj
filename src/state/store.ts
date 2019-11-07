import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"

import * as reducers from "./ducks"

let middleware: any

if (process.env.NODE_ENV !== "production") {
    middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
} else {
    middleware = applyMiddleware(thunkMiddleware)
}

export default function configureStore() {
    return createStore(
        combineReducers(reducers),
        // (window as any).REDUX_INITIAL_DATA,
        middleware
    )
}