let baseURL;
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:5001';
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://iv1201-backend.onrender.com';
}

export const apiConfig = {
  BACKEND_BASEURL: baseURL,
};
