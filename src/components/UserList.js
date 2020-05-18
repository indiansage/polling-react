import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBox from './SearchBox';
import { userActions } from '../actions/userActions';

class UserList extends Component {
    componentDidMount() {
        this.props.getAllUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.removeUser(id);
    }

    handleToggleAdminUser(id, isAdmin) {
        return (e) => this.props.toggleAdminUser(id, isAdmin);
    }

    render() {
        const { users } = this.props;

        return (
            <div /*className="col-md-6 col-md-offset-3"*/>
                {/* <h1>Hi {user.firstName}!</h1> */}
                <div className="box">
                    <div className="container">
                        <h1 className="title has-text-centered-mobile">
                            List of Users
                        </h1>
                        <SearchBox />
                        {users.loading && <em>Loading users...</em>}
                        {users.error && <span>ERROR: {users.error}</span>}
                        {users.items && (
                            <ul>
                                {users.items
                                    .filter(
                                        (item) => item.id !== this.props.user.id
                                    )
                                    .map((user, index) => (
                                        <li key={user.id}>
                                            {user.username}
                                            {user.isAdmin ? (
                                                <strong>(Admin User)</strong>
                                            ) : (
                                                ''
                                            )}
                                            {user.togglingAdmin ? (
                                                <></>
                                            ) : user.deleting ? (
                                                <em> - Deleting...</em>
                                            ) : user.deleteError ? (
                                                <span /* className="text-danger" */
                                                >
                                                    {' '}
                                                    - ERROR: {user.deleteError}
                                                </span>
                                            ) : (
                                                <span>
                                                    {' '}
                                                    -{' '}
                                                    <a
                                                        onClick={this.handleDeleteUser(
                                                            user.id
                                                        )}
                                                    >
                                                        Delete
                                                    </a>
                                                </span>
                                            )}
                                            {user.deleting ? (
                                                <></>
                                            ) : user.togglingAdmin ? (
                                                <em>
                                                    {' '}
                                                    - Toggling Admin Status...
                                                </em>
                                            ) : user.toggleAdminError ? (
                                                <span /* className="text-danger" */
                                                >
                                                    {' '}
                                                    - ERROR:{' '}
                                                    {user.toggleAdminError}
                                                </span>
                                            ) : (
                                                <span>
                                                    {' '}
                                                    -{' '}
                                                    <a
                                                        onClick={this.handleToggleAdminUser(
                                                            user.id,
                                                            user.isAdmin
                                                        )}
                                                    >
                                                        Toggle Admin
                                                    </a>
                                                </span>
                                            )}
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const mapDispatchToProps = {
    getAllUsers: userActions.getAllUsers,
    removeUser: userActions.removeUser,
    toggleAdminUser: userActions.toggleAdminUser
};

export const connectedUserList = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);
export { connectedUserList as UserList };
