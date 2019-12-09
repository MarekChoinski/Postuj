import * as actions from "./actions";

export const addPost = (
    content: string,
    // authorName: string,
    // authorProfilePicture: string,

) => {

    return async (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {

        console.log("state", getState());

        const state = getState().firebase;


        try {
            const firestore = getFirestore();

            await firestore.collection('posts').add({
                content: content,
                // authorName: state.profile.username,
                authorId: state.auth.uid,
                createdAt: new Date(),
                // authorProfilePicture: state.profile.profilePicPath,
            });

            // await getFirebase()
            //     .ref('posts')
            //     .push({
            //         content: content,
            //         authorName: authorName,
            //         authorId: "1234",
            //         createdAt: new Date(),
            //     });

            // getState().firestore.add({ collection: 'cities' }, { name: 'Some Place' }),

            dispatch(actions.addPost(content));

        } catch (error) {
            // TODO here should came action with meta error
            console.error(error);
            //     dispatch(clearPosts());
        }
    };
};

export const deletePost = actions.deletePost;


export const setSortMethod = actions.setSortMethod;

export default {
    addPost,
    deletePost,
};
