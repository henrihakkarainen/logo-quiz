import {
  CHANGE_MODAL_MODE,
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_MODAL_STATE
} from '../constants/actionTypes';

const initialState = {
  language: '',
  showModal: false,
  modalMode: 'login',
  showModalError: false,
  errorCode: 0
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MODAL_MODE:
      return {
        ...state,
        modalMode: action.mode,
        showModalError: false,
        errorCode: 0
      }
    case CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
        errorCode: 0,
        showModalError: false
      }
    case OPEN_MODAL:
      return {
        ...state,
        modalMode: 'login',
        showModal: true
      }
    case SET_MODAL_STATE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

export default appReducer;