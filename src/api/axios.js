import Axios from 'axios';

// let baseURL;
// if (process.env.NODE_ENV === 'development') {
//   baseURL = 'http://localhost:5001';
// } else if (process.env.NODE_ENV === 'production') {
//   baseURL = 'vår prod url för backenden';
// }

export const axios = Axios.create({
  baseURL: 'http://localhost:5001',
});
