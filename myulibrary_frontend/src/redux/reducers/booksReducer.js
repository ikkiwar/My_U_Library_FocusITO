import {GET_BOOK_LIST} from "../types";

const initialState = {
    books: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BOOK_LIST:
            return {
                ...state,
                books: action.payload
            };
        default:
            return state;
    }
}