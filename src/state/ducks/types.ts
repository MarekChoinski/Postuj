import { PostsState } from './posts/types'
import { AuthState } from './auth/types'

export interface DuckStates {
    posts: PostsState,
    auth: AuthState,
}