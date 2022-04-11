import {LOGIN_USER_FULFILLED, GET_USER_LIST } from "../types";

export const getUserData = (email) => (dispatch)=> {

    let heads = new Headers();
    heads.append("content-type", "Application/json");
    fetch(
        `http://localhost:49146/api/user${email ? '?email='+email : '' }`,
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

export const getUsersList = () => (dispatch)=> {

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
                type: GET_USER_LIST,
                payload: res,
            });
        });
    });
};