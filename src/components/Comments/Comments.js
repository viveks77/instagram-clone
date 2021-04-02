import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import styles from './Comments.module.css';
import Avatar from '../UI/Avatar/Avatar';

const Comments = (props) => {
    
    if(props.data.length === 0){
        return <div className={styles.Wrapper}>
            <h5>Be the first one to add a comment.</h5>
        </div>
    }

    const comments = props.data.map(comment => (
        <div key={comment._id} className={styles.UserCard}>
            <Avatar imgSrc={"data:image/png;base64," + comment.user.avatar}/>
            <div className={styles.UserCardMeta}>
                <p><strong>{comment.user.username}</strong> {comment.text}</p>
                <p style={{color : "#8e8e8e", fontSize: "0.8rem"}}>{formatDistanceToNow(new Date(comment.createdAt), {
                             addSuffix : true
                })}</p>
            </div>
        </div>
    ))

    return(
        <div className={styles.Wrapper}>
            {comments}
        </div>
    )
}

export default Comments;