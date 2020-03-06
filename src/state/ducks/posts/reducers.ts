import * as types from "./types";
// import uuid from "uuid";

const initialState: types.PostsState = {
    actualPage: 1,
    sortMethod: types.SortMethod.Newest,
    // sortProfileMethod: "newest",
};

const reducer = (
    state = initialState,
    action: types.PostActionTypes// | types.TitleActionTypes
): types.PostsState => {

    switch (action.type) {
        // case types.ADD_POST:
        case types.SET_SORT_METHOD:
            // case types.SET_PROFILE_SORT_METHOD:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

export default reducer;