export const SIGN_IN = "bloggy/auth/SIGN_IN";
export const SIGN_OUT = "bloggy/auth/SIGN_OUT";
export const SIGN_UP = "bloggy/auth/SIGN_UP";


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