import * as actions from "./actions";

export const addPost = (
    content: string,
    authorName: string,
) => {

    return async (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {

        try {
            const firestore = getFirestore();

            await firestore.collection('posts').add({
                content: content,
                authorName: authorName,
                authorId: "123",
                createdAt: new Date(),
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

            dispatch(actions.addPost(content, authorName));

        } catch (error) {
            // TODO here should came action with meta error
            console.error(error);
            //     dispatch(clearPosts());
        }
    };
};

export const deletePost = actions.deletePost;

export default {
    addPost,
    deletePost,
};
