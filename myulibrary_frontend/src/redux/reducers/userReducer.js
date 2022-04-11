import {LOGIN_USER_FULFILLED, GET_USER_LIST} from "../types";

const initalState = {
  user: [],
  isLoggedIn: false,
  isLoading: false,
  error: null,
  usersList: [],
};

export default function ( state= initalState, action ) {
  switch ( action.type ) {
    case 'LOGIN_USER_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_USER_FULFILLED':

      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        isLoggedIn: false,
        user: {},
      };
      case 'GET_USER_LIST':
        console.log(action.payload);
      return {
        ...state,
        usersList: action.payload,
      };
    default:
      return state;
  }
}