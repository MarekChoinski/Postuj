import * as types from "./types";
import { any } from "prop-types";
import { boolean } from "yup";

interface SignInAction {
    type: typeof types.SIGN_IN,
    payload: {
        error?: string
    },
    error?: boolean,
}

export const signIn = (
): SignInAction => ({
    type: types.SIGN_IN,
    payload: {},
});

export const signInFailed = (
    error: string,
): SignInAction => ({
    type: types.SIGN_IN,
    payload: {
        error
    },
    error: true,
});

interface SignOutAction {
    type: typeof types.SIGN_OUT,
    payload?: {
        error: string
    },
    error?: boolean,
}

export const signOut = (
): SignOutAction => ({
    type: types.SIGN_OUT,
});

export const signOutFailed = (
    error: string,
): SignOutAction => ({
    type: types.SIGN_OUT,
    payload: {
        error
    },
    error: true,
});

interface SignUpAction {
    type: typeof types.SIGN_UP,
    payload: {
        error?: string
    },
    error?: boolean,
}

export const signUp = (
): SignUpAction => ({
    type: types.SIGN_UP,
    payload: {},
});

export const signUpFailed = (
    error: string,
): SignUpAction => ({
    type: types.SIGN_UP,
    payload: {
        error
    },
    error: true,
});

export type AuthActionTypes =
    SignOutAction |
    SignInAction |
    SignUpAction;