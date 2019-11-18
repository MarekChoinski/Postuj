import * as types from "./types";

export const addPost = (
    content: string,
    authorName: string,
    // createdAt: any,
): types.PostActionTypes => ({
    type: types.ADD_POST,
    payload: {
        content,
        authorName,
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
