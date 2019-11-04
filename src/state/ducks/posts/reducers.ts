import * as types from "./types";
// import uuid from "uuid";

const initialState: types.TodosState = {
    title: "TODO",
    todos: [{
        // id: uuid.v1(),
        text: "Sprawdzam cos tam",
        done: false,
    },
    {
        // id: uuid.v1(),
        text: "Inny task jbc",
        done: false,
    },
    {
        // id: uuid.v1(),
        text: "Kolejny task",
        done: true,
    }],
};


const reducer = (
    state = initialState,
    action: types.TodoActionTypes | types.TitleActionTypes
): types.TodosState => {
    switch (action.type) {
        case types.ADD_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        // id: uuid.v1(),
                        done: false,
                        ...action.payload,
                    }
                ],
            }
        case types.TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ?
                        {
                            ...todo,
                            done: !todo.done
                        } : todo
                )
            }

        case types.EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ?
                        {
                            ...todo,
                            ...action.payload,
                        } : todo
                )
            }

        case types.DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo =>
                    todo.id !== action.payload.id
                )
            }

        case types.EDIT_TITLE:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

export default reducer;