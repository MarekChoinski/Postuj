import * as types from "./types";
import { any } from "prop-types";
import { boolean } from "yup";

interface SignInAction {
    type: typeof types.SIGN_IN,
    payload?: Error,
    error?: boolean,
}

export const signIn = (
): SignInAction => ({
    type: types.SIGN_IN,
});

export const signInFailed = (
    error: string,
): SignInAction => ({
    type: types.SIGN_IN,
    payload: new Error(error),
});

export type AuthActionTypes =
    // AddPostAction |
    SignInAction;