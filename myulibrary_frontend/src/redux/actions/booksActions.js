import {GET_BOOK_LIST} from "../types";

export const getBooksList = () => (dispatch)=> {

    let heads = new Headers();
    heads.append("content-type", "Application/json");
    fetch(
        `http://localhost:49146/api/books`,
        {
            method: "GET",
            headers: heads,
        }
    ).then((response) => {
        response.json().then((res) => {
            dispatch({
                type: GET_BOOK_LIST,
                payload: res,
            });
        });
    });
};