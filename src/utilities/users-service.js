import * as usersAPI from './users-api';
import sendRequest from './send-request';
const BASE_URL = '/api/users';


export async function signUp(userData) {

    const token = await usersAPI.signUp(userData);
    console.log(typeof token)
    localStorage.setItem('token', token);

    return getUser();
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


  