import * as actions from "./actions";
import firebase from 'firebase';

export const signIn = (
    email: string,
    password: string,
) => {

    return async (dispatch: any, getState: any, { getFirebase }: any) => {

        try {
            // const firebase = getFirebase();

            console.log("auth!");
            await firebase.auth().signInWithEmailAndPassword(email, password);



            dispatch(actions.signIn());

        } catch (error) {

            if (error.code == "auth/user-not-found") {
                error = "User not found!";
            }
            else {
                error = error.code + " " + error.message;
            }

            dispatch(actions.signInFailed(error));
        }
    };
};

export const signOut = () => {

    return async (dispatch: any, getState: any, { getFirebase }: any) => {

        try {
            // const firebase = getFirebase();

            await firebase.auth().signOut();

            dispatch(actions.signOut());

        } catch (error) {

            // if (error.code == "auth/user-not-found") {
            //     error = "User not found!";
            // }
            // else {
            //     error = error.code + " " + error.message;
            // }

            dispatch(actions.signOutFailed(error.code));
        }
    };
};

// export const deletePost = actions.deletePost;

export default {
    signIn,
    signOut,
};
