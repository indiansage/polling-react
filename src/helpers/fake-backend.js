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
let votesByQuestion = JSON.parse(localStorage.getItem('votesByQuestion')) || [];

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
                    case url.match(/\/polls\/\d+\/vote$/) && method === 'POST':
                        return vote();
                    case url.match(/\/polls\/\d+\/votes$/) && method === 'GET':
                        return getVotes();
                    case url.match(/\/polls\/votes$/) && method === 'GET':
                        return getVotesForAllClosed();
                    case url.endsWith('/users') && method === 'GET':
                        return getAllUsers();
                    case url.match(/\/users\/\d+$/) && method === 'DELETE':
                        return removeUser();
                    case url.match(/\/users\/\d+$/) && method === 'PATCH':
                        return modifyAdminStatusUser();
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
                        token: 'fake-jwt-token-admin-' + user.id
                    });
                } else {
                    return ok({
                        id: user.id,
                        username: user.username,
                        isAdmin: user.isAdmin,
                        token: 'fake-jwt-token-' + user.id
                    });
                }
            }

            function getPolls() {
                if (!isLoggedIn()) return unauthorized();
                if (isUserLoggedIn()) {
                    const tokenParts = headers['Authorization'].split('-');
                    const userId = parseInt(tokenParts[tokenParts.length - 1]);
                    const responseBody = polls.filter((poll) => {
                        const isPollLive = poll.live;
                        let userVoted =
                            votesByQuestion &&
                            votesByQuestion.find((question) => {
                                const doesQuestionHaveVotes =
                                    question.qid === poll.id;
                                const didUserVote = question.votes.find(
                                    (vote) => vote.uid === userId
                                );

                                return doesQuestionHaveVotes && didUserVote;
                            })
                                ? true
                                : false;
                        return isPollLive && !userVoted;
                    });

                    return ok(responseBody);
                }
                if (isAdminLoggedIn()) {
                    return ok(polls);
                }
            }

            function createPoll() {
                if (!isAdminLoggedIn()) return unauthorized();
                const poll = body;
                let errorCount = 0;
                poll.forEach((p) => {
                    if (
                        polls.find((x) => x.question === p.question && x.live)
                    ) {
                        errorCount++;
                    } else {
                        p.id = polls.length
                            ? Math.max(...polls.map((x) => x.id)) + 1
                            : 1;
                        polls.push(p);
                    }
                });
                if (errorCount === poll.length) {
                    return error('All the questions are already live!');
                } else if (errorCount > 0) {
                    return ok(
                        'Some polls were already live, remaining created successfully!'
                    );
                } else {
                    localStorage.setItem('polls', JSON.stringify(polls));
                    return ok('Created successfully!');
                }
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
                if (!isUserLoggedIn()) return unauthorized();
                // structure of polls object :
                //[{id,live,question,options:[option,option,...]},{id,live,question,options:[option,option,...]},...]
                // structure of votesByQuestion object :
                //[{qid,votes:[{uid,option},{uid,option},...]},{qid,votes:[{uid,option},{uid,option},...]},...]
                const { option } = body;
                const urlParts = url.split('/');
                const qid = parseInt(urlParts[urlParts.length - 2]);
                const tokenParts = headers['Authorization'].split('-');
                const uid = parseInt(tokenParts[tokenParts.length - 1]);
                const question = votesByQuestion.find(
                    (question) => question.qid === qid
                ); //find all votes for question
                //console.log(Boolean(question));
                if (!question) {
                    //console.log('question');
                    const questionIsLive = polls.find(
                        (x) => x.id === qid && x.live
                    );
                    if (questionIsLive) {
                        let question = {};
                        question.qid = qid;
                        question.votes = [];
                        question.votes.push({ uid, option });
                        votesByQuestion.push(question);
                        localStorage.setItem(
                            'votesByQuestion',
                            JSON.stringify(votesByQuestion)
                        );
                        return ok();
                    } else {
                        return error('Question not found!');
                    }
                }
                const userVotedBefore = question.votes.find(
                    (vote) => vote.uid === uid
                );
                if (userVotedBefore) {
                    return error('Vote already counted for this poll!');
                } else {
                    question.votes.push({ uid, option });
                    votesByQuestion = votesByQuestion.filter(
                        (question) => question.qid !== qid
                    );
                    votesByQuestion.push(question);
                    localStorage.setItem(
                        'votesByQuestion',
                        JSON.stringify(votesByQuestion)
                    );
                    return ok();
                }
            }

            function getVotes() {
                if (!isAdminLoggedIn()) return unauthorized();
                const urlParts = url.split('/');
                const qid = parseInt(urlParts[urlParts.length - 2]);

                const poll = polls.find((poll) => poll.id === qid);
                if (!poll) {
                    return error('Poll not found!');
                }
                if (poll.live) {
                    return error('Poll not closed yet!');
                }
                const question = votesByQuestion.find(
                    (question) => qid === question.qid
                );
                let responseBody = {};
                //poll -> {id,live,question,options:[option,option,...]}
                //question -> {qid,votes:[{uid,option},{uid,option},...]}
                //response format -> {qid,question,options:[{option,votes},{option,votes},...]}
                if (!question) {
                    responseBody.qid = qid;
                    responseBody.question = poll.question;
                    responseBody.options = poll.options.map((option) => {
                        return { option, votes: 0 };
                    });

                    return ok(responseBody);
                }
                responseBody.qid = qid;
                responseBody.question = poll.question;
                responseBody.options = poll.options.map((option) => {
                    const votes = question.votes.reduce(
                        (sum, vote) => (vote.option === option ? sum++ : sum),
                        0
                    );
                    return { option, votes };
                });
                return ok(responseBody);
            }

            function getVotesForAllClosed() {
                if (!isAdminLoggedIn()) return unauthorized();
                if (polls === []) {
                    return ok([]);
                }
                const closedPolls = polls.filter((poll) => !poll.live);

                const responseBody = closedPolls.map((poll) => {
                    const question = votesByQuestion.find(
                        (question) => poll.id === question.qid
                    );
                    //console.log('   ', 'question', question);
                    let returnBody = {};

                    if (!question) {
                        returnBody.qid = poll.id;
                        returnBody.question = poll.question;
                        returnBody.options = {};
                        poll.options.forEach((option) => {
                            returnBody.options[option] = 0;
                        });

                        return returnBody;
                    }
                    returnBody.qid = poll.id;
                    returnBody.question = poll.question;
                    returnBody.options = {};

                    question.votes.forEach((vote) => {
                        if (returnBody.options[vote.option]) {
                            returnBody.options[vote.option] =
                                returnBody.options[vote.option] + 1;
                        } else {
                            returnBody.options[vote.option] = 1;
                        }
                    });
                    return returnBody;
                });

                //poll -> {id,live,question,options:[option,option,...]}
                //question -> {qid,votes:[{uid,option},{uid,option},...]}
                // structure of closedPolls object :
                //[{id,live,question,options:[option,option,...]},{id,live,question,options:[option,option,...]},...]
                // structure of votesByQuestion object :
                //[{qid,votes:[{uid,option},{uid,option},...]},{qid,votes:[{uid,option},{uid,option},...]},...]
                //response format ->
                //[{qid,question,options:[{option:votes},{option:votes},...]}...]
                //desired response format ->
                //{qid:[question:{{option:votes},{option:votes}}]}
                return ok(responseBody);
            }

            function getAllUsers() {
                if (!isAdminLoggedIn()) return unauthorized();
                //remove passwords
                let responseBody = users.map((user) => {
                    const { password, ...userCopy } = user;
                    return userCopy;
                });
                return ok(responseBody);
            }

            function removeUser() {
                if (!isAdminLoggedIn()) return unauthorized();

                users = users.filter((x) => x.id !== idFromUrl());
                localStorage.setItem('users', JSON.stringify(users));
                return ok();
            }

            function modifyAdminStatusUser() {
                if (!isAdminLoggedIn()) return unauthorized();
                const { isAdmin } = body;
                let modifyForUser = users.find((x) => x.id === idFromUrl());
                //console.log(modifyForUser, idFromUrl());
                modifyForUser.isAdmin = isAdmin;
                users = users.filter((x) => x.id !== idFromUrl());
                users.push(modifyForUser);
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
                return headers['Authorization'].startsWith(
                    'Bearer fake-jwt-token'
                );
            }

            function isUserLoggedIn() {
                return headers['Authorization'].match(
                    /Bearer fake-jwt-token-\d+$/
                );
            }

            function isAdminLoggedIn() {
                return headers['Authorization'].startsWith(
                    'Bearer fake-jwt-token-admin'
                );
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }
        });
    };
}
