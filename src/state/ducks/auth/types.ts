export const SIGN_IN = "bloggy/auth/SIGN_IN";
export const SIGN_OUT = "bloggy/auth/SIGN_OUT";
export const SIGN_UP = "bloggy/auth/SIGN_UP";


export interface AuthState {
    readonly authError: string,
}

interface SignInAction {
    type: typeof SIGN_IN,
    payload: {
        error?: string
    },
    error?: boolean,
}
interface SignOutAction {
    type: typeof SIGN_OUT,
    payload?: {
        error: string
    },
    error?: boolean,
}
interface SignUpAction {
    type: typeof SIGN_UP,
    payload: {
        error?: string
    },
    error?: boolean,
}

export type AuthActionTypes =
    SignOutAction |
    SignInAction |
    SignUpAction;