import { SET_USER, AUTH_ERROR } from "./authTypes";

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case AUTH_ERROR:
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
};
