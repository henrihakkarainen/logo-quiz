import axios from '../../config/axiosConfig';
import { SET_ACCESS_TOKEN, SET_USER, LOG_OUT } from '../constants/actionTypes';
import { closeModal, setModalState } from './appActions';

const setUser = (payload) => {
  return { type: SET_USER, payload };
}

const logoutUser = () => {
  return { type: LOG_OUT };
}

export const setAccessToken = (token) => {
  return { type: SET_ACCESS_TOKEN, token };
}

export const fetchUser = (payload) => dispatch => {
  axios.get(`/users/${payload.id}`, {
    headers: {
      'Authorization': `Bearer ${payload.token}`
    }
  })
  .then(res => {
    dispatch(setUser({
      username: res.data.username,
      email: res.data.email,
      role: res.data.role
    }));
    dispatch(closeModal());
  });
}

export const loginUser = (credentials) => dispatch => {
  axios.post(
    '/auth/login', JSON.stringify(credentials), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
  })
  .then(res => {
    localStorage.setItem('refreshToken', res.data.refreshToken)
    dispatch(setAccessToken(res.data.accessToken));
    dispatch(fetchUser({
      id: res.data.id,
      token: res.data.accessToken
    }));
  })
  .catch(err => {
    dispatch(setModalState({
      errorCode: err.response.status,
      showModalError: true
    }));
  });
}

export const autoLogin = (payload) => dispatch => {
  axios.get(`/users/${payload.id}`, {
    headers: {
      'Authorization': `Bearer ${payload.token}`
    }
  })
  .then(res => {
    dispatch(setUser({
      username: res.data.username,
      email: res.data.email,
      role: res.data.role
    }));
  })
  .catch((err) => {
    console.log(err);
  });
}

export const logout = () => dispatch => {
  axios.delete('/auth/logout', {
    refreshToken: localStorage.getItem('refreshToken')
  })
  .then(() => {
    localStorage.removeItem('refreshToken');
    dispatch(logoutUser());
  })
  .catch((err) => {
    console.log(err);
  });
}