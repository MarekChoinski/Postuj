import * as types from "./types";
// import uuid from "uuid";

const initialState: any = {
    authError: null,
};


const reducer = (
    state = initialState,
    action: types.AuthActionTypes// | types.TitleActionTypes
): types.AuthState => {

    switch (action.type) {
        case types.SIGN_IN:
            console.log(action);

            return action.error ?
                {
                    ...state,
                    authError: action.payload.error,
                }
                : {
                    ...state,
                    authError: null,
                }

        case types.SIGN_OUT:
            return action.error ?
                state
                : state;

        default:
            return state;
    }
};

export default reducer;