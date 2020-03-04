import * as actions from "./actions";
import * as types from "./types";
import firebase from 'firebase';
import { Dispatch } from 'redux';

import { State } from '../../store'

export const addPost = (
    content: string,
    attachedPhoto?: File,
) => async (
    dispatch: Dispatch<types.PostActionTypes>,
    getState: () => State,
    {
        getFirestore
    }: any
): Promise<void> => {
        let timestamp = new Date();

        const state = getState().firebase;

        try {
            let url = "";
            if (attachedPhoto) {
                const ref = firebase.storage()
                    .ref()
                    .child("photos/" + state.profile.username + "/" + timestamp.getTime() + ".jpg");
                await ref.put(attachedPhoto);
                url = await ref.getDownloadURL();
            }

            const firestore = getFirestore();

            await firestore.collection('posts').add({
                content: content,
                attachedPhoto: url,
                authorId: state.auth.uid,
                createdAt: new Date(),
                likedBy: [],
                likes: 0, //NOTE: we need this field to properly sort posts by likes
            });

            // dispatch(actions.addPost(content));

        } catch (error) {
            // TODO here should came action with meta error
            console.error(error);
        }

    };

export const addPostToFavorites = (
    id: string,
) => async (
    getState: () => State,
    {
        getFirebase,
    }: any
) => {

        const actualFavoritePosts = getState().firebase.profile.favoritePosts;

        try {
            if (!actualFavoritePosts.includes(id)) {
                getFirebase().updateProfile({
                    favoritePosts: [id, ...actualFavoritePosts],
                });
            }

        } catch (error) {
            // TODO here should came action with meta error
            console.error(error);
        }

    };

export const removePostFromFavorites = (
    id: string,
) => async (
    dispatch: Dispatch<types.PostActionTypes>,
    getState: () => State,
    {
        getFirebase,
        getFirestore
    }: any
) => {

        const actualFavoritePosts = getState().firebase.profile.favoritePosts.filter((item: string) => item !== id);

        //console.log("actualFavoritePosts", actualFavoritePosts);


        try {
            getFirebase().updateProfile({
                favoritePosts: [...actualFavoritePosts],
            });

            // dispatch(actions.addPost(content));

        } catch (error) {
            // TODO here should came action with meta error
            console.error(error);
        }

    };

export const likePost = (
    id: string,
) => async (
    dispatch: Dispatch<types.PostActionTypes>,
    getState: () => State,
    {
        getFirebase,
        getFirestore
    }: any
) => {

        const likedPostsByUser = getState().firebase.profile.likedPosts;
        const user_id = getState().firebase.auth.uid;

        const postRef = getFirestore().collection('posts').doc(id);

        const postDoc = await postRef.get();
        const peopleWhoLikedPost = postDoc.data().likedBy;

        const likesOnPost = postDoc.data().likes;

        try {
            if (!peopleWhoLikedPost.includes(user_id)) {
                getFirebase().updateProfile({
                    likedPosts: [id, ...likedPostsByUser],
                });

                await postRef.update({
                    likedBy: [user_id, ...peopleWhoLikedPost],
                    likes: likesOnPost + 1,
                    id, //NOTE: this dissappears when updating document. Seems to be problem with react-redux-firebase
                });
            }
            // dispatch(actions.addPost(content));

        } catch (error) {
            // TODO here should came action with meta error
            console.error(error);
        }
    };

export const unlikePost = (
    id: string,
) => async (
    // dispatch: Dispatch<types.PostActionTypes>,
    getState: () => State,
    {
        getFirebase,
        getFirestore
    }: any
) => {

        const likedPostsByUser = getState().firebase.profile.likedPosts.filter((item: string) => item !== id);
        const user_id = getState().firebase.auth.uid;

        const postRef = getFirestore().collection('posts').doc(id);

        const postDoc = await postRef.get();
        const peopleWhoLikedPost = postDoc.data().likedBy.filter((item: string) => item !== user_id);
        const likesOnPost = postDoc.data().likes;

        try {
            getFirebase().updateProfile({
                likedPosts: [...likedPostsByUser],
            });

            await postRef.update({
                likedBy: [...peopleWhoLikedPost],
                likes: likesOnPost - 1,
                id, //NOTE: this dissappears when updating document. Seems to be problem with react-redux-firebase
            });
            // dispatch(actions.addPost(content));

        } catch (error) {
            // TODO here should came action with meta error
            console.error(error);
        }
    };

export const deletePost = actions.deletePost;
export const setSortMethod = actions.setSortMethod;
export const setProfileSortMethod = actions.setProfileSortMethod;

export default {
    addPost,
    deletePost,
    setSortMethod,
    addPostToFavorites,
    likePost,
    unlikePost,
};