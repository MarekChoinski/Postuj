import * as types from "./types";
import { AuthActionTypes } from "./actions";
// import uuid from "uuid";

const initialState: any = {
    authError: null,
};





const reducer = (
    state = initialState,
    action: AuthActionTypes// | types.TitleActionTypes
): any => {

    switch (action.type) {
        case types.SIGN_IN:
            return action.error ?
                {
                    ...state,
                    authError: action.payload,
                }
                : {
                    ...state,
                    authError: null,
                }

        default:
            return state;
    }
};

export default reducer;