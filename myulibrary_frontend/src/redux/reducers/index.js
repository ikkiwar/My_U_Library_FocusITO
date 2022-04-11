import {combineReducers} from "redux";
import userReducer from "./userReducer";
import booksReducer from "./booksReducer";

const allReducers = combineReducers({
    user: userReducer,
    books: booksReducer
});

export default allReducers;