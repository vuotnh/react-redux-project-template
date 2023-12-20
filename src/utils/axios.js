import axios from 'axios';

const instance = axios.create({});

instance.interceptors.request.use(
  async (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
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
    if (status === 401 && !config._retry) {
      config._retry = true;
      try {
        await refreshToken();
        return Promise.resolve(instance(config));
      } catch (e) {
        // nếu refresh hết hạn thì đẩy vể login
        localStorage.removeItem('access_token');
        sessionStorage.clear();
        // window.location.assign('/auth/login');
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);

async function refreshToken() {
  try {
    const refreshTokenRes = await axios({
      url: `${import.meta.env.VITE_API_URL}/auth/refresh`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (refreshTokenRes.status === 200) {
      localStorage.setItem('access_token', refreshTokenRes.data?.access_token);
      return refreshTokenRes;
    }
  } catch (err) {
    localStorage.removeItem('access_token');
    sessionStorage.clear();
    // window.location.assign('/auth/login');
    return Promise.reject(err);
  }
}

export default instance;
