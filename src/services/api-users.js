import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
});

export const addUser = async (data) => {
  try {
    await api.post('/add', data);
    console.log('User added successfully');
    return true;
  } catch (error) {
    console.log('Error while adding user: ', error);
    return false;
  }
};

export const getUsers = async () => {
  try {
    return await api.get('/all');
  } catch (error) {
    console.log('Error while calling get Users API ', error.response);
  }
};

export const getUser = async (id) => {
  try {
    return await api.get(`/user/${id}`);
  } catch (error) {
    console.log('Error while calling getUser API ', error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    return await api.get(`/user/email/${email}`);
  } catch (error) {
    console.log('Error while calling getUserByEmail API ', error.response);
  }
};

export const editUser = async (user, id) => {
  try {
    return await api.put(`/user/${id}`, user);
  } catch (error) {
    console.log('Error while calling editUser API ', error);
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/user/${id}`);
  } catch (error) {
    console.log('Error while calling deleteUser API ', error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    console.log(response.status); // Output the HTTP status code
    console.log(response.data); // Output the response data
    return response;
  } catch (error) {
    console.log('Error while calling login API: ', error);
  }
};

// Set the default Authorization header with the token from local storage
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Use the 'api' instance for making authenticated requests
api.get('{URL}')
  .then((response) => {
    // Handle the response
  })
  .catch((error) => {
    // Handle the error
  });