import React, {Fragment} from 'react';
import {useHistory} from 'react-router-dom';
import { CommentIcon, HeartIcon } from '../UI/Icons';
import styles from './SuggestedPosts.module.css';

const SuggestedPosts = (props) => {
    const history = useHistory();
    if(!props.posts){
        return null;
    }
    return(
        <Fragment>
            <div className={styles.Wrapper}>
                {props.posts.map(post => {
                   return(
                    <div className={styles.Container} onClick={() => {history.push(`/post/${post._id}`)}} key={post._id}>
                        <img src={"data:image/png;base64," +post.files} alt={""} />
                        <div className={styles.Overlay}>
                            <div className={styles.OverlayContent}>
                                <span>
                                    <HeartIcon />  {post.likesCount}
                                </span>
                                <span>
                                    <CommentIcon />  {post.commentsCount}
                                </span>
                            </div>
                        </div>
                    </div>
                   )
                })}
            </div>
        </Fragment>
    );
}

export default SuggestedPosts;
