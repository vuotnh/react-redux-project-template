import axios from 'axios';

const instance = axios.create({});

instance.interceptors.request.use(
  async (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// refresh access_token khi hết hạn
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response, config } = error;
    const status = response?.status;
    if (status === 401) {
      refreshToken();
      return instance(config);
    }
    return Promise.reject(error);
  },
);

function refreshToken() {
  fetch('http://localhost:8082/auth/refresh', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        window.location.assign('http://localhost:8082/login');
      }
      return Promise.reject(response);
    })
    .then((data) => {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('expired_in', data.expires_in);
    });
}

export default instance;
