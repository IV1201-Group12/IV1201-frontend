let baseURL;
if (process.env.NODE_ENV === 'development') {
  baseURL = `http://127.0.0.1:${import.meta.env.PORT}`;
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://iv1201-backend.onrender.com';
}

export const apiConfig = {
  BACKEND_BASEURL: baseURL,
};
