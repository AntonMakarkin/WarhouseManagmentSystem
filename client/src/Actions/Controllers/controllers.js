import { CLEAR_STATE } from "../../Constants/actionTypes"

export const clearData = () => (dispatch) => {
    dispatch({ type: CLEAR_STATE });
}