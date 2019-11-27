export const SIGN_IN = "bloggy/auth/SIGN_IN";
export const SIGN_OUT = "bloggy/auth/SIGN_OUT";
// export const DELETE_POST = "bloggy/posts/DELETE_POST";
// export const TOGGLE_TODO = "todo_app/TOGGLE_TODO";
// export const EDIT_TODO = "todo_app/EDIT_TODO";

// export const EDIT_TITLE = "todo_app/TOGGLE_TITLE";


// export type Post = Readonly<{
//     content: string,
//     authorName: string,
//     date: string,
//     id: string,
// }>;

export interface AuthState {
    readonly authError: string,
}


// interface AddPostAction {
//     type: typeof ADD_POST;
//     payload: Pick<Post, 'content' | "authorName">;
// }

// interface DeletePostAction {
//     type: typeof DELETE_POST;
//     payload: Pick<Post, 'id'>;
// }

// interface EditTitleAction {
//     type: typeof EDIT_TITLE;
//     payload: {
//         title: string,
//     }
// }


// export type PostActionTypes =
//     AddPostAction |
//     DeletePostAction;

// export type TitleActionTypes = EditTitleAction;