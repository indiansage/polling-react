import { apiUrl } from '../constants';
import { authHeader } from '../helpers/auth-header';
import { userService } from './userService';

export const pollService = {
    getAll,
    create,
    close,
    vote,
    getVotes,
    getAllClosedPollsWithVotes
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

async function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const response = await fetch(`${apiUrl}/polls`, requestOptions);
    return handleResponse(response);
}

async function create(poll) {
    console.log('req', poll);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(poll)
    };
    console.log('requestOptions', requestOptions);

    const response = await fetch(`${apiUrl}/polls/create`, requestOptions);
    console.log('res', response);
    return handleResponse(response);
}

async function close(pollId) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ live: false })
    };

    const response = await fetch(`${apiUrl}/polls/${pollId}`, requestOptions);
    return handleResponse(response);
}

async function vote(pollId, option) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ option })
    };

    const response = await fetch(
        `${apiUrl}/polls/${pollId}/vote`,
        requestOptions
    );
    return handleResponse(response);
}

async function getVotes(pollId) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader() }
    };

    const response = await fetch(
        `${apiUrl}/polls/${pollId}/votes`,
        requestOptions
    );
    return handleResponse(response);
}

export async function getAllClosedPollsWithVotes() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader() }
    };

    const response = await fetch(`${apiUrl}/polls/votes`, requestOptions);
    return handleResponse(response);
}
