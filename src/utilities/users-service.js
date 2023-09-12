import * as usersAPI from './users-api';

const BASE_URL = '/api/users';


export async function signUp(userData) {

    const token = await usersAPI.signUp(userData);
    console.log(typeof token)
    localStorage.setItem('token', token);

    return getUser();
} 

export async function getUserData(userId) {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

export async function updateUserData(userId, updatedUserData) {
    console.log(updatedUserData);
    try {
      const updatedUser = await usersAPI.updateUserData(userId, updatedUserData);

      
      return updatedUser;
    } catch (error) {
      throw new Error('Update failed: ' + error.message);
    }
  }


export async function login(credentials) {
    try {
      const token = await usersAPI.login(credentials);
      localStorage.setItem('token', token);
     
      return getUser();
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  }



export function getToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload.exp <Date.now() / 1000) {
        localStorage.removeItem('token');
        return null;
    }
    return token;
}

export function getUser() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logOut() {
    localStorage.removeItem('token');
}

export function checkToken() {
    return usersAPI.checkToken().then(dateStr => new Date(dateStr));
}


export async function deleteUserData(userId) {
    const BASE_URL = 'http://localhost:3001/api/users';
    try {
      const success = await usersAPI.deleteUserData(userId);
      return success;
    } catch (error) {
      throw new Error('Delete user data failed: ' + error.message);
    }
  }