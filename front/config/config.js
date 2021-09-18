export const USER_SERVER = '/api/users';
export const PRODUCT_SERVER = '/api/product';
export const SERVER_URL =
  process.env.NODE_ENV === 'production' ? 'https://storemomo.herokuapp.com' : 'http://localhost:5000';
