import axios from '../../config/axiosConfig';
import { SET_USER, LOG_OUT } from '../constants/actionTypes';

const setUser = (payload) => {
  return { type: SET_USER, payload };
}

export const logoutUser = () => {
  return { type: LOG_OUT };
}

export const fetchUser = (payload) => dispatch => {
  axios.get(`/user/${payload.id}`, {
    headers: {
      'Authorization': `Bearer ${payload.token}`
    }
  })
  .then(res => {
    dispatch(setUser({
      username: res.data.username,
      email: res.data.email,
      role: res.data.role
    }))
  });
}

export const loginUser = (credentials) => {
  axios.post(
    '/auth/login', JSON.stringify(credentials), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
  })
  .then(res => {
    localStorage.setItem('token', res.data.token)
    fetchUser({
      id: res.data.id,
      token: res.data.token
    })
  });
}