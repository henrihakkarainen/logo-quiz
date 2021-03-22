import { SET_ACCESS_TOKEN, SET_USER, LOG_OUT } from '../constants/actionTypes';

const initialState = {
  accessToken: '',
  loggedIn: false,
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.token
      }
    case SET_USER:
      return {
        ...state,
        loggedIn: true,
        user: {
          ...action.payload
        }
      };
    case LOG_OUT:
      return {
        ...state,
        loggedIn: false,
        user: {}
      };
    default:
      return state;
  }
}

export default userReducer;