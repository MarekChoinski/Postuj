import * as types from "./types";
// import uuid from "uuid";

const initialState: types.PostsState = {
    sortMethod: "newest",
    sortProfileMethod: "newest",
};

const reducer = (
    state = initialState,
    action: types.PostActionTypes// | types.TitleActionTypes
): types.PostsState => {

    switch (action.type) {
        case types.ADD_POST:
            // return {
            //     ...state,
            //     posts: [
            //         ...state.posts,
            //         {
            //             // id: uuid.v1(),
            //             id: "TEST",
            //             ...action.payload,
            //         }
            //     ],
            // }
            return state;

        // case types.DELETE_POST:
        //     return {
        //         ...state,
        //         posts: state.posts.filter(post =>
        //             post.id !== action.payload.id
        //         )
        //     }

        case types.SET_SORT_METHOD:
        case types.SET_PROFILE_SORT_METHOD:
            return {
                ...state,
                ...action.payload,
            }
            return state;

        default:
            return state;
    }
};

export default reducer;