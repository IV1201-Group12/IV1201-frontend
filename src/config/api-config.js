let baseURL;
if (process.env.NODE_ENV === 'development') {
  baseURL = `http://${import.meta.env.REACT_APP_BACKEND_HOST}:${
    import.meta.env.REACT_APP_BACKEND_PORT
  }`;
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://iv1201-backend.onrender.com';
}

export const apiConfig = {
  BACKEND_BASEURL: baseURL,
};
