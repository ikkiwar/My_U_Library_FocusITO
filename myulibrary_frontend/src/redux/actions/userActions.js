import {LOGIN_USER_FULFILLED} from "../types";

export const getUserData = () => (dispatch)=> {
    console.log("me ejecute en action");
    let heads = new Headers();
    heads.append("content-type", "Application/json");
    fetch(
        `http://localhost:49146/api/user`,
        {
            method: "GET",
            headers: heads,
        }
    ).then((response) => {
        response.json().then((res) => {
            dispatch({
                type: LOGIN_USER_FULFILLED,
                payload: res,
            });
        });
    });
};