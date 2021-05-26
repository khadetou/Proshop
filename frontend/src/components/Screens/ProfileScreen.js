import React from 'react';
import {Link} from 'react-router-dom';

const ProfileScreen = () => {
    return (
        <div>
            <Link to='/profile-edit' className='btn btn-dark'>Edit profile</Link>
        </div>
    )
}

export default ProfileScreen;
