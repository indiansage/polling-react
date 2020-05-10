// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
const admin = { username: 'admin', password: 'admin', isAdmin: true };
if (!users.find((x) => x.username === 'admin')) {
    // for testing purposes we are creating admin user
    admin.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
    users.push(admin);
    localStorage.setItem('users', JSON.stringify(users));
}
let polls = JSON.parse(localStorage.getItem('polls')) || [];

export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const { method, headers } = opts;
        const body = opts.body && JSON.parse(opts.body);

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 2000);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/register') && method === 'POST':
                        return register();
                    case url.endsWith('/users/authenticate') &&
                        method === 'POST':
                        return authenticate();
                    case url.endsWith('/polls') && method === 'GET':
                        return getPolls();
                    case url.endsWith('/polls/create') && method === 'POST':
                        return createPoll();
                    case url.match(/\/polls\/\d+$/) && method === 'PATCH':
                        return modifyStatusPoll();
                    case url.match(/\/polls\/\d+\/vote$/) && method === 'PATCH':
                        return vote();
                    case url.endsWith('/users') && method === 'GET':
                        return getUsers();
                    case url.match(/\/users\/\d+$/) && method === 'DELETE':
                        return deleteUser();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then((response) => resolve(response))
                            .catch((error) => reject(error));
                }
            }

            // route functions
            function register() {
                const user = body;

                if (users.find((x) => x.username === user.username)) {
                    return error(`Username ${user.username} is already taken`);
                }

                // assign user id and a few other properties then save
                user.id = users.length
                    ? Math.max(...users.map((x) => x.id)) + 1
                    : 1;
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                return ok();
            }

            function authenticate() {
                const { username, password } = body;
                const user = users.find(
                    (x) => x.username === username && x.password === password
                );
                if (!user) return error('Username or password is incorrect');
                if (user.isAdmin) {
                    return ok({
                        id: user.id,
                        username: user.username,
                        isAdmin: user.isAdmin,
                        token: 'fake-jwt-token-admin'
                    });
                } else {
                    return ok({
                        id: user.id,
                        username: user.username,
                        isAdmin: user.isAdmin,
                        token: 'fake-jwt-token'
                    });
                }
            }

            function getPolls() {
                if (!isLoggedIn()) return unauthorized();
                if (isLoggedIn() && !isAdminLoggedIn()) {
                    return ok(polls.filter((x) => x.live));
                }
                if (isAdminLoggedIn()) {
                    return ok(polls);
                }
            }

            function createPoll() {
                if (!isAdminLoggedIn()) return unauthorized();
                const poll = body;

                if (polls.find((x) => x.question === poll.question && x.live)) {
                    return error('This question is already live');
                }

                // assign user id and a few other properties then save
                poll.id = polls.length
                    ? Math.max(...polls.map((x) => x.id)) + 1
                    : 1;
                users.push(poll);
                localStorage.setItem('polls', JSON.stringify(polls));

                return ok();
            }

            function modifyStatusPoll() {
                if (!isAdminLoggedIn()) return unauthorized();
                const poll = polls.find((x) => x.id === idFromUrl());
                poll.live = body.live;
                polls = polls.filter((x) => x.id !== idFromUrl());
                polls.push(poll);
                localStorage.setItem('polls', JSON.stringify(polls));
                return ok();
            }

            function vote() {
                if (!isLoggedIn()) return unauthorized();
                const urlParts = url.split('/');
                const id = parseInt(urlParts[urlParts.length - 2]);
                const poll = polls.find((x) => x.id === id);
                poll.options = poll.options.map((x) => {
                    if (x.option === body.option) {
                        x.votes++;
                        return x;
                    } else {
                        return x;
                    }
                });
                polls = polls.filter((x) => x.id !== id);
                polls.push(poll);
                localStorage.setItem('polls', JSON.stringify(polls));
                return ok();
            }

            function getUsers() {
                if (!isAdminLoggedIn()) return unauthorized();

                return ok(users);
            }

            function deleteUser() {
                if (!isAdminLoggedIn()) return unauthorized();

                users = users.filter((x) => x.id !== idFromUrl());
                localStorage.setItem('users', JSON.stringify(users));
                return ok();
            }

            // helper functions

            function ok(body) {
                resolve({
                    ok: true,
                    text: () => Promise.resolve(JSON.stringify(body))
                });
            }

            function unauthorized() {
                resolve({
                    status: 401,
                    text: () =>
                        Promise.resolve(
                            JSON.stringify({ message: 'Unauthorized' })
                        )
                });
            }

            function error(message) {
                resolve({
                    status: 400,
                    text: () => Promise.resolve(JSON.stringify({ message }))
                });
            }

            function isLoggedIn() {
                return (
                    headers['Authorization'] === 'Bearer fake-jwt-token' ||
                    headers['Authorization'] === 'Bearer fake-jwt-token-admin'
                );
            }

            function isAdminLoggedIn() {
                return (
                    headers['Authorization'] === 'Bearer fake-jwt-token-admin'
                );
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }
        });
    };
}
