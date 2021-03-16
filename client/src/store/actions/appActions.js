import {
  CHANGE_MODAL_MODE,
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_MODAL_STATE
} from '../constants/actionTypes';

export const setModalState = (payload) => {
  return { type: SET_MODAL_STATE, payload };
}

export const openModal = () => {
  return { type: OPEN_MODAL };
}

export const changeModalMode = (mode) => {
  return { type: CHANGE_MODAL_MODE, mode };
}

export const closeModal = () => {
  return { type: CLOSE_MODAL };
}