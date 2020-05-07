import { SET_USER, AUTH_ERROR, LOG_OUT } from "./authTypes";

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload, loading: false };
    case LOG_OUT:
      return { ...state, user: null, loading: false };
    case AUTH_ERROR:
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
};
