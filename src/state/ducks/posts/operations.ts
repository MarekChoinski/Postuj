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
            likes: 0,
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

export const deletePost = actions.deletePost;
export const setSortMethod = actions.setSortMethod;

export default {
    addPost,
    deletePost,
    setSortMethod,
    addPostToFavorites,
};
