import * as actions from "./actions";
import firebase from 'firebase';
import * as types from "./types";
import { Dispatch } from 'redux';
import { State } from '../../store'

export const signIn = (
    email: string,
    password: string,
) => async (
    dispatch: Dispatch<types.AuthActionTypes>,
    getState: () => State,
    ): Promise<void> => {

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            dispatch(actions.signIn());

        } catch (error) {

            if (error.code === "auth/user-not-found") {
                error = "User not found!";
            } else {
                error = error.code + " " + error.message;
            }

            dispatch(actions.signInFailed(error));
        }
    };


export const signOut = () => {

    return async (
        dispatch: any,
        getState: () => State
    ) => {

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
    profilePic: File,
) => {

    return async (
        dispatch: any,
        getState: () => State, {
            getFirebase,
            getFirestore
        }: any) => {

        const ref = firebase.storage().ref().child("profilePictures/av-" + username + ".jpg");

        try {
            await ref.put(profilePic);
            const url = await ref.getDownloadURL();

            getFirebase().createUser({
                email: email,
                password: password,
            }, {
                username: username,
                profilePicPath: url,
                favoritesPosts: [],
                likedPosts: [],
                createdAt: new Date(),
            })

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