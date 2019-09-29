import Axios from 'axios';
const url1 = 'https://quiet-atoll-55962.herokuapp.com';
const url = 'https://firman-backend.herokuapp.com';

export const getWishlist = (id, header) => {
  return {
    type: 'GET_WISHLIST',
    payload: Axios.get(`${url}/api/wishlist/${id}`, header),
  };
};

export const addWishlist = (user, item, header) => {
  return {
    type: 'ADD_WISHLIST',
    payload: Axios.post(`${url}/api/wishlist/${user}/${item}`, {}, header),
  };
};

export const deleteWishlist = (user, item, header) => {
  return {
    type: 'DELETE_WISHLIST',
    payload: Axios.delete(`${url}/api/wishlist/${user}/${item}`, header),
  };
};

export const resetWishlist = () => {
  return {
    type: 'RESET_WISHLIST',
  };
};
