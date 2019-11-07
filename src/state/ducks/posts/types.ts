export const ADD_POST = "bloggy/posts/ADD_POST";
export const DELETE_POST = "bloggy/posts/DELETE_POST";
// export const TOGGLE_TODO = "todo_app/TOGGLE_TODO";
// export const EDIT_TODO = "todo_app/EDIT_TODO";

// export const EDIT_TITLE = "todo_app/TOGGLE_TITLE";


export type Post = Readonly<{
    text: string,
    user: string,
    date: string,
    id: string,
}>;

export interface PostsState {
    // readonly title: string,
    readonly posts: ReadonlyArray<Post>,
}


interface AddPostAction {
    type: typeof ADD_POST;
    payload: Pick<Post, 'text' | "user" | "date">;
}

interface DeletePostAction {
    type: typeof DELETE_POST;
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
    DeletePostAction;

// export type TitleActionTypes = EditTitleAction;