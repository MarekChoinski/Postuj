export const ADD_POST = "bloggy/posts/ADD_POST";
export const DELETE_POST = "bloggy/posts/DELETE_POST";
export const SET_SORT_METHOD = "bloggy/posts/SET_SORT_METHOD";
export const ADD_POST_TO_FAVORITES = "bloggy/posts/ADD_POST_TO_FAVORITES";
export const REMOVE_POST_FROM_FAVORITES = "bloggy/posts/REMOVE_POST_FROM_FAVORITES";
export const LIKE_POST = "bloggy/posts/LIKE_POST";
export const UNLIKE_POST = "bloggy/posts/UNLIKE_POST";

export type Post = Readonly<{
    content: string,
    authorName: string,
    date: string,
    id: string,
}>;

export interface PostsState {
    // readonly title: string,
    // readonly posts: ReadonlyArray<Post>,
    readonly sortMethod: string,
}


interface AddPostAction {
    type: typeof ADD_POST;
    payload: Pick<Post, 'content'>;
    // payload: Pick<Post, 'content' | "authorName">;
}

interface DeletePostAction {
    type: typeof DELETE_POST;
    payload: Pick<Post, 'id'>;
}

interface setSortMethod {
    type: typeof SET_SORT_METHOD;
    payload: {
        sortMethod: string,
    };
}

interface addPostToFavorites {
    type: typeof ADD_POST_TO_FAVORITES;
    payload: Pick<Post, 'id'>;
}

interface removePostFromFavorites {
    type: typeof REMOVE_POST_FROM_FAVORITES;
    payload: Pick<Post, 'id'>;
}

interface likePost {
    type: typeof LIKE_POST;
    payload: Pick<Post, 'id'>;
}

interface unlikePost {
    type: typeof UNLIKE_POST;
    payload: Pick<Post, 'id'>;
}


export type PostActionTypes =
    AddPostAction |
    setSortMethod |
    addPostToFavorites |
    removePostFromFavorites |
    likePost |
    unlikePost |
    DeletePostAction;

// export type TitleActionTypes = EditTitleAction;