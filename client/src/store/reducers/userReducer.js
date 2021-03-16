import { SET_USER, LOG_OUT } from '../constants/actionTypes';

const initialState = {
  loggedIn: false,
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        loggedIn: true,
        user: {
          ...action.payload
        }
      };
    case LOG_OUT:
      return {
        loggedIn: false,
        user: {}
      };
    default:
      return state;
  }
}

export default userReducer;