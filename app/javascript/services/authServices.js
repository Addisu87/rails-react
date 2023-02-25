import client from '../redux/axios';

const register = async (userName, email, password) => {
  await client
    .post('/signup', {
      userName,
      email,
      password
    })
    .then((res) => {
      localStorage.setItem('token', res.headers.get('Authorization'));
    })
    .catch((err) => {
      console.log(err);
    });
};

const login = async (email, password) => {
  await client
    .post('/login', {
      email,
      password
    })
    .then((response) => {
      if (response.data.email) {
        localStorage.setItem('token', JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const logout = async () => {
  localStorage.removeItem('token');
  return await client.delete('/logout').then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('token'));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser
};

export default AuthService;
