import Axios from 'axios';
const url1 = 'https://quiet-atoll-55962.herokuapp.com';
const url = 'https://firman-backend.herokuapp.com';

export const login = data => {
  return {
    type: 'LOGIN',
    payload: Axios.post(`${url}/api/user/login`, data),
  };
};

export const logout = data => {
  return {
    type: 'LOGOUT',
  };
};

export const register = data => {
  return {
    type: 'REGISTER',
    payload: Axios.post(`${url}/api/user/register`, data),
  };
};
