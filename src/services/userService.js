import { apiUrl } from '../constants';
import { authHeader } from '../helpers/auth-header';

export const userService = {
    login,
    logout,
    register,
    getAllUsers,
    getById,
    update,
    removeUser,
    toggleAdminUser
};

//helper function
function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

async function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    console.log('req', user);
    const response = await fetch(`${apiUrl}/users/register`, requestOptions);
    console.log('resp', response);
    return handleResponse(response);
}

async function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    const response = await fetch(
        `${apiUrl}/users/authenticate`,
        requestOptions
    );
    const user = await handleResponse(response);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

async function getAllUsers() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader() }
    };

    const response = await fetch(`${apiUrl}/users`, requestOptions);
    return handleResponse(response);
}

async function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader() }
    };

    const response = await fetch(`${apiUrl}/users/${id}`, requestOptions);
    return handleResponse(response);
}

async function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }, //...authHeader()
        body: JSON.stringify(user)
    };

    const response = await fetch(`${apiUrl}/users/${user.id}`, requestOptions);
    return handleResponse(response);
}

async function removeUser(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader() }
    };

    const response = await fetch(`${apiUrl}/users/${id}`, requestOptions);
    return handleResponse(response);
}

async function toggleAdminUser(id, isAdmin) {
    const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader() },
        body: JSON.stringify({ isAdmin: !isAdmin })
    };

    const response = await fetch(`${apiUrl}/users/${id}`, requestOptions);
    return handleResponse(response);
}
