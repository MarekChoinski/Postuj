import * as actions from "./actions";
import firebase from 'firebase';

export const signIn = (
    email: string,
    password: string,
) => {

    return async (dispatch: any, getState: any, { getFirebase }: any) => {

        try {
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

export const signUp = (
    email: string,
    password: string,
    username: string,
    profilePicPath: any,
) => {

    return async (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {

        const ref = firebase.storage().ref().child("profilePictures/av-" + username + ".jpg");

        console.log("Witamy w reduxie", profilePicPath);





        try {
            await ref.put(profilePicPath);
            console.log("uploaded!");
            const url = await ref.getDownloadURL();
            console.log(url);


            getFirebase().createUser(
                {
                    email: email,
                    password: password,
                },
                {
                    username: username,
                    profilePicPath: url,
                }
            )


            dispatch(actions.signUp());

        } catch (error) {

            // if (error.code == "auth/user-not-found") {
            //     error = "User not found!";
            // }
            // else {
            //     error = error.code + " " + error.message;
            // }

            dispatch(actions.signUpFailed(error.code));
        }
    };
};

export default {
    signIn,
    signOut,
    signUp,
};
