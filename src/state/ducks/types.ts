import { PostsState } from './posts/types'
import { AuthState } from './auth/types'

export interface State {
    posts: PostsState,
    auth: AuthState,
    firebase: any;
    firestore: any;
}