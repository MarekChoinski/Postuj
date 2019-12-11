import * as types from "./types";

export const addPost = (
    content: string,
    // authorName: string,
    // createdAt: any,
): types.PostActionTypes => ({
    type: types.ADD_POST,
    payload: {
        content,
        // authorName,
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

export const addPostToFavorites = (
    id: string
): types.PostActionTypes => ({
    type: types.ADD_POST_TO_FAVORITES,
    payload: {
        id,
    },
});


export const removePostFromFavorites = (
    id: string
): types.PostActionTypes => ({
    type: types.REMOVE_POST_FROM_FAVORITES,
    payload: {
        id,
    },
});


export const setSortMethod = (
    sortMethod: string
): types.PostActionTypes => ({
    type: types.SET_SORT_METHOD,
    payload: {
        sortMethod,
    },
});
