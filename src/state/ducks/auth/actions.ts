import * as types from "./types";
import { any } from "prop-types";
import { boolean } from "yup";

export const signIn = (
): types.AuthActionTypes => ({
    type: types.SIGN_IN,
    payload: {},
});

export const signInFailed = (
    error: string,
): types.AuthActionTypes => ({
    type: types.SIGN_IN,
    payload: {
        error
    },
    error: true,
});

export const signOut = (
): types.AuthActionTypes => ({
    type: types.SIGN_OUT,
});

export const signOutFailed = (
    error: string,
): types.AuthActionTypes => ({
    type: types.SIGN_OUT,
    payload: {
        error
    },
    error: true,
});

export const signUp = (
): types.AuthActionTypes => ({
    type: types.SIGN_UP,
    payload: {},
});

export const signUpFailed = (
    error: string,
): types.AuthActionTypes => ({
    type: types.SIGN_UP,
    payload: {
        error
    },
    error: true,
});

