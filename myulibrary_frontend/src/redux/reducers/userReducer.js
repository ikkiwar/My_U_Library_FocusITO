import {LOGIN_USER_FULFILLED} from "../types";

const initalState = {
  user: {},
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

export default function ( state= initalState, action ) {
  switch ( action.type ) {
    case 'LOGIN_USER_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_USER_FULFILLED':
      console.log(action.payload);
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
    default:
      return state;
  }
}