import React from 'react';
import styles from './UserCard.module.css';
import Avatar from '../Avatar/Avatar';

const UserCard = ({user, clicked}) => {

    return(
        <div className={styles.UserCard}>
            <Avatar imgSrc={user.avatar} altSrc={user.username}  />
            <div onClick={clicked} className={styles.UserInfo}>
                <h3>{user.username}</h3>
                <span>{user.fullname}</span>
            </div>
        </div>
    )
}

export default UserCard;