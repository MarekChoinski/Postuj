import * as types from "./types";

export const addTodo = (text: string): types.TodoActionTypes => ({
    type: types.ADD_TODO,
    payload: {
        text,
    },
});

export const deleteTodo = (id: string): types.TodoActionTypes => ({
    type: types.DELETE_TODO,
    payload: {
        id,
    },
});

export const toggleTodo = (id: string): types.TodoActionTypes => ({
    type: types.TOGGLE_TODO,
    payload: {
        id,
    },
});

export const editTodo = (id: string, text: string): types.TodoActionTypes => ({
    type: types.EDIT_TODO,
    payload: {
        id,
        text,
    },
});

export const editTitle = (title: string): types.TitleActionTypes => ({
    type: types.EDIT_TITLE,
    payload: {
        title,
    },
});

