import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}`
  : '/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

let csrfToken: string | null = null;

export const setCsrfToken = (token: string) => {
  csrfToken = token;
};

api.interceptors.request.use((config) => {
  if (
    csrfToken &&
    ['POST', 'PUT', 'PATCH', 'DELETE'].includes(
      config.method?.toUpperCase() || ''
    )
  ) {
    config.headers['CSRF-Token'] = csrfToken;
  }

  return config;
});
