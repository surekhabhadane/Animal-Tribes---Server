import React, { Fragment, useState, useEffect } from 'react';
import man from '../../../assets/images/dashboard/user.png';
import { User, Mail, Lock, Settings } from 'react-feather';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const UserMenu = (props) => {
    const {profileUri, logoutButtonHandler } = props;
    const [profile, setProfile] = useState('');

    useEffect(() => {
        setProfile(localStorage.getItem('profileURL') || man);
    }, []);

    return (
        <Fragment>
            <li className="onhover-dropdown">
                <div className="media align-items-center">
                    <img
                        className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
                        src={profileUri ? profileUri : profile}
                        alt="header-user" />
                    <div className="dotted-animation">
                        <span className="animate-circle"></span>
                        <span className="main-circle"></span>
                    </div>
                </div>
                <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                    <li><Link to={`${process.env.PUBLIC_URL}/users/userEdit`}><User />Edit Profile</Link></li>
                    <li><a href="#!"><Mail />Inbox</a></li>
                    <li><a href="#!"><Lock />Lock Screen</a></li>
                    <li><a href="#!"><Settings />Settings</a></li>
                    <li>
                        <Link
                            to='/'
                            onClick={() => logoutButtonHandler()}>
                            {`Log out`}
                        </Link>
                    </li>
                    {/* <li><a onClick={logOut} href="#!" ><LogOut /> Log out</a></li> */}
                </ul>
            </li>
        </Fragment>
    );
};


export default withRouter(UserMenu);