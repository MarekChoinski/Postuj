import * as types from "./types";

export const addPost = (
    text: string,
    user: string,
    date: string
): types.PostActionTypes => ({
    type: types.ADD_POST,
    payload: {
        text,
        user,
        date,
    },
});

export const deletePost = (
    id: string
): types.PostActionTypes => ({
    type: types.DELETE_POST,
    payload: {
        id,
    },
});
