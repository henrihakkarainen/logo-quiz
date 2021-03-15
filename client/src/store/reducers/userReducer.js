import { SET_USER, LOG_OUT } from '../constants/actionTypes';

const initialState = {
  loggedIn: false,
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return state;
    case LOG_OUT:
      return state;
    default:
      return state;
  }
}

export default userReducer;