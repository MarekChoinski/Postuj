import * as actions from "./actions";

export const addPost = (
    content: string,
) => async (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {

    const state = getState().firebase;

    try {
        const firestore = getFirestore();

        await firestore.collection('posts').add({
            content: content,
            authorId: state.auth.uid,
            createdAt: new Date(),
            likedBy: [],
            likes: 0,  //NOTE: we need this field to properly sort posts by likes
        });

        dispatch(actions.addPost(content));

    } catch (error) {
        // TODO here should came action with meta error
        console.error(error);
    }

};

export const addPostToFavorites = (
    id: string,
) => async (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {

    const actualFavoritePosts = getState().firebase.profile.favoritePosts;

    try {
        if (!actualFavoritePosts.includes(id)) {
            getFirebase().updateProfile({
                favoritePosts: [id, ...actualFavoritePosts],
            });
        }
        // dispatch(actions.addPost(content));

    } catch (error) {
        // TODO here should came action with meta error
        console.error(error);
    }

};

export const removePostFromFavorites = (
    id: string,
) => async (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {

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
) => async (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {

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
) => async (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {

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

export default {
    addPost,
    deletePost,
    setSortMethod,
    addPostToFavorites,
    likePost,
    unlikePost,
};
