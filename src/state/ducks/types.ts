import { PostsState } from './posts/types'
import { AuthState } from './auth/types'

export interface StateAll {
    posts: PostsState,
    auth: AuthState,
}

// export interface StateAll {
// }