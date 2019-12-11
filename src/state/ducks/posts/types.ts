export const ADD_POST = "bloggy/posts/ADD_POST";
export const DELETE_POST = "bloggy/posts/DELETE_POST";
export const SET_SORT_METHOD = "bloggy/posts/SET_SORT_METHOD";
export const ADD_POST_TO_FAVORITES = "bloggy/posts/ADD_POST_TO_FAVORITES";
export const REMOVE_POST_FROM_FAVORITES = "bloggy/posts/REMOVE_POST_FROM_FAVORITES";
// export const TOGGLE_TODO = "todo_app/TOGGLE_TODO";
// export const EDIT_TODO = "todo_app/EDIT_TODO";

// export const EDIT_TITLE = "todo_app/TOGGLE_TITLE";


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

// interface EditTitleAction {
//     type: typeof EDIT_TITLE;
//     payload: {
//         title: string,
//     }
// }


export type PostActionTypes =
    AddPostAction |
    setSortMethod |
    addPostToFavorites |
    removePostFromFavorites |
    DeletePostAction;

// export type TitleActionTypes = EditTitleAction;