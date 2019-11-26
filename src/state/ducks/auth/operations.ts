import * as actions from "./actions";

export const signIn = (
    email: string,
    password: string,
) => {

    return async (dispatch: any, getState: any, { getFirebase }: any) => {

        try {
            const firebase = getFirebase();

            await firebase.auth().signInWithEmailAndPassword(email, password);

            dispatch(actions.signIn());

        } catch (error) {
            dispatch(actions.signInFailed(error));
        }
    };
};

export const signOut = () => {

    return async (dispatch: any, getState: any, { getFirebase }: any) => {

        try {
            const firebase = getFirebase();

            await firebase.auth().signOut();

            dispatch(actions.signOut());

        } catch (error) {
            dispatch(actions.signOutFailed(error));
        }
    };
};

// export const deletePost = actions.deletePost;

export default {
    signIn,
    signOut,
};
