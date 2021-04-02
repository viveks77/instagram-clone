import React from 'react';
import styles from './ShowFollowers.module.css';

const ShowFollowers = ({followers}) => {
    

    const userRedirectHandler =(username) =>{
        // console.log(username);
        // history.relace({
        //     pathname : `/user/${username}`
        // })
    }

    return(
        <div>
            <h3 style={{margin: "10px 10px"}}>Followers</h3>
            {followers.map(user => {
                return <div  key={user._id} className={styles.UserCard}>
                            <img src={"data:image/png;base64," + user.avatar} alt=""/>
                            <div onClick={() => userRedirectHandler(user.username)} className={styles.UserMeta}>
                                <p><strong>{user.username}</strong></p>
                                <p>{user.fullname}</p>
                            </div>
                        </div>
            })}
        </div>
    );
}

export default ShowFollowers;