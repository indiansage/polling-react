import { apiUrl } from '../constants';
import { authHeader } from '../helpers/auth-header';
import { userService } from './userService';

export const pollService = {
    getAll
};

//helper function
function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/polls`, requestOptions).then(handleResponse);
}