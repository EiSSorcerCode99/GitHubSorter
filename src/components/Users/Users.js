import React from 'react';
import UserItem from './UserItem';
import './UserItem.css';
import Spinner from '../Layout/Spinner';
import PropTypes from 'prop-types'


const Users = ({ users, loading}) => {
    if (loading) {
        <Spinner />
    }
            return (
                <div style={userStyle}>
                    {users.map(user => {
                       return <UserItem key={user.id} user={user} />
                    })} 
                </div>
            )

}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

const userStyle = {
    marginTop: '.5rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users;
